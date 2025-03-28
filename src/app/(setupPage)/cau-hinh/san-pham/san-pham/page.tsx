"use client";
import AlertError from "@/components/alert/AlertError";
import AlertOption from "@/components/alert/AlertOption";
import AlertSuccess from "@/components/alert/AlertSuccess";
import CheckboxLabel from "@/components/checkbox/CheckBox";
import CustomButtonUploadImage from "@/components/customButtomUploadImage/customButtonUploadImage";
import InputConfig from "@/components/inputComponent/inputRegisterLecture";
import TextAreaConfig from "@/components/inputComponent/textAreaConfig";
import SelectType from "@/components/select/Select";
import ColumnsProduct from "@/components/table/ColumnProduct";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { APIGetCategories } from "@/services/category";
import {
  APICreateNewProduct,
  APIDeleteProduct,
  APIGetProductById,
  APIGetProducts,
  APIUpdateProduct,
} from "@/services/product";
import { setMode } from "@/store/slices/modeSlice";
import {
  clearProduct,
  setIsDeleteProduct,
  setProduct,
} from "@/store/slices/productSlice";
import { RootState } from "@/store/store";
import { ClassificationItem, ProductFormData } from "@/types/productType";
import { yupResolver } from "@hookform/resolvers/yup";
import { CopyPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const ConfigValidationSchema = Yup.object({
  product_name: Yup.string().required("Tên sản phẩm là bắt buộc"),
  category_id: Yup.string().optional(),
  price: Yup.number().optional(),
  images: Yup.array().of(Yup.string().required()).required(),
  description: Yup.string().optional(),
  discount_price: Yup.number().optional(),
  stock: Yup.number().optional(),
  priority: Yup.boolean().required(),
  material: Yup.string().optional(),
  code: Yup.string().optional(),
  warranty: Yup.string().optional(),
});

interface CategoryListItem {
  value: string;
  id: string;
}

interface CategoryObject {
  _id: string;
  category_name: string;
  category_image: string;
  description: string;
  customer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<ProductFormData>({
    resolver: yupResolver(ConfigValidationSchema),
    defaultValues: {
      product_name: "",
      category_id: "",
      price: 0,
      discount_price: 0,
      stock: 0,
      material: "",
      code: "",
      warranty: "",
      images: [],
      images_delete: [],
      description: "",
      classification: [],
      priority: false,
      additional_services: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "classification",
  });

  const mode = useSelector((state: RootState) => state.mode.modeInfo.mode);
  const product = useSelector((state: RootState) => state.product.product);
  const isDeleteProduct = useSelector(
    (state: RootState) => state.product.setIsDeleteProduct
  );
  const dispatch = useDispatch();

  const [imageList, setImageList] = useState<any[]>([]);
  const [dataTable, setDataTable] = useState([]);
  const [able, setAble] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [alertDescription, setAlertDescription] = useState("");
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterForm, setFilterForm] = useState<any>({
    page: 1,
    limit: 10,
  });
  const [categoryList, setCategoryList] = useState<CategoryListItem[]>([]);

  useEffect(() => {
    if (product._id) {
      reset({
        product_name: product.product_name,
        category_id: product.category_id._id,
        price: product.price,
        discount_price: product.discount_price,
        stock: product.stock,
        material: product.material,
        code: product.code,
        warranty: product.warranty,
        images: product.images,
        description: product.description,
        classification: product.classification?.map((item: any) => ({
          images: item.images,
          classifications: item.classifications?.map((c: any) => ({
            classification_name: c.classification_name,
            classification_value: c.classification_value,
          })),
          price: item.price,
          remaining: item.remaining,
          _id: item._id,
        })),
        priority: product.priority,
        additional_services: product.additional_services,
      });
      setImageList(product.images || []);
      setAble(true);
    }
  }, [product]);

  useEffect(() => {
    handleClearData();
    handleSetMode("create");
  }, []);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files?.length) return;

    console.log("Files selected:", files);

    // Tạo array chứa tất cả promises của việc đọc file
    const readFilePromises = Array.from(files).map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        })
    );

    try {
      // Đợi tất cả files được đọc xong
      const newImages = await Promise.all(readFilePromises);
      console.log("Processed images:", newImages);

      // Cập nhật state và form một lần duy nhất
      setImageList((prevList) => {
        const updatedList = [...prevList, ...newImages];
        setValue("images", updatedList);
        return updatedList;
      });
    } catch (error) {
      console.error("Error processing images:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    const removedImage = imageList[index];
    const updatedImages = imageList.filter((_, i) => i !== index);
    setImageList(updatedImages);
    setValue("images", updatedImages);
    const currentImageDelete = getValues("images_delete") || [];
    setValue("images_delete", [...currentImageDelete, removedImage]);
  };

  const handleClearData = () => {
    reset();
    setImageList([]);
    dispatch(clearProduct());
  };

  const handleSetMode = (mode: string) => {
    dispatch(setMode({ mode: mode }));
  };

  const onSubmit = async (data: any) => {
    const validClassifications = data.classification?.map((item: any) => ({
      ...item,
      price: Number(item.price) || 0,
      remaining: Number(item.remaining) || 0,
    }));

    const body = {
      ...data,
      classification: validClassifications,
      images: imageList,
    };

    if (mode === "create") {
      await handleCreateProduct(body);
    } else if (mode === "view") {
      setAble(false);
      handleSetMode("edit");
    } else if (mode === "edit" && product._id) {
      const classification_update = body.classification.filter(
        (item: any) => item._id
      );
      console.log(
        "🚀 ~ onSubmit ~ classification_update:",
        classification_update
      );

      const classification_delete = product.classification.filter(
        (item: any) =>
          !body.classification
            .filter((bodyItem: CategoryObject) => bodyItem._id)
            .some((bodyItem: CategoryObject) => bodyItem._id === item._id)
      );
      const classification_add = body.classification.filter(
        (item: any) => !item._id
      );
      const body_update = {
        ...body,
        classification: classification_update,
        classification_add: classification_add,
        classification_delete: classification_delete,
        classification_update: classification_update,
      };
      await handleUpdateProduct(body_update, product._id);
      handleSetMode("view");
    }
  };

  const handleCreateProduct = async (data: any) => {
    try {
      const response = await APICreateNewProduct(data);
      if (response?.status === 201) {
        setAlertDescription("Thêm sản phẩm thành công!");
        setShowAlertSuccess(true);
        handleGetProductList();
        handleSetMode("view");
        if (response?.data._id) handleGetProduct(response.data._id);
        setTimeout(() => setShowAlertSuccess(false), 3000);
      } else {
        setAlertDescription("Thêm sản phẩm thất bại!");
        setShowAlertError(true);
        setTimeout(() => setShowAlertError(false), 3000);
      }
    } catch (err) {
      setAlertDescription("Thêm sản phẩm thất bại!");
      setShowAlertError(true);
      setTimeout(() => setShowAlertError(false), 3000);
    }
  };

  const handleGetProduct = async (id: string) => {
    try {
      const response = await APIGetProductById(id);
      if (response?.status === 200) {
        dispatch(setProduct(response.data));
        dispatch(setMode({ mode: "view" }));
        // Cập nhật form với dữ liệu sản phẩm
        reset(response.data);
        setImageList(response.data.images || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetProductList = async () => {
    try {
      setLoading(true);
      const response = await APIGetProducts(filterForm);
      if (response?.status === 200) {
        setTotalItems(response?.total);
        const data = response?.data.map((item: any) => ({
          ...item,
          category_name: item.category_id?.category_name,
        }));
        setDataTable(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (data: any, id: string) => {
    try {
      const response = await APIUpdateProduct(data, id);
      if (response?.status === 200) {
        setAlertDescription("Cập nhật sản phẩm thành công!");
        setShowAlertSuccess(true);
        handleGetProductList();
        if (product._id) handleGetProduct(product._id);
        setValue("images_delete", []);
        setTimeout(() => setShowAlertSuccess(false), 3000);
      } else {
        setAlertDescription("Cập nhật sản phẩm thất bại!");
        setShowAlertError(true);
        setTimeout(() => setShowAlertError(false), 3000);
      }
    } catch (err) {
      setAlertDescription("Cập nhật sản phẩm thất bại!");
      setShowAlertError(true);
      setTimeout(() => setShowAlertError(false), 3000);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await APIDeleteProduct(id);
      if (response?.status === 200) {
        setAlertDescription("Xóa sản phẩm thành công!");
        setShowAlertSuccess(true);
        handleClearData();
        handleGetProductList();
        handleSetMode("create");
        setTimeout(() => setShowAlertSuccess(false), 3000);
      }
    } catch (err) {
      setAlertDescription("Xóa sản phẩm thất bại!");
      setShowAlertError(true);
      setTimeout(() => setShowAlertError(false), 3000);
    }
  };

  const handleGetCategories = async () => {
    const response = await APIGetCategories();
    if (response?.status === 200) {
      setCategoryList(
        response.data.map((item: any) => ({
          value: item.category_name,
          id: item._id,
        }))
      );
    }
  };

  useEffect(() => {
    handleGetCategories();
    handleGetProductList();
  }, [filterForm]);

  useEffect(() => {
    dispatch(setMode({ mode: "create" }));
    handleClearData();
  }, []);

  useEffect(() => {
    if (isDeleteProduct) {
      handleGetProductList();
      dispatch(setIsDeleteProduct(false));
      handleSetMode("create");
      handleClearData();
    }
  }, [isDeleteProduct]);

  return (
    <div className="bg-white h-full w-full rounded-lg p-3 shadow-md">
      <div className="flex flex-row items-center gap-4">
        <p className="text-black font-sans text-[20px] font-medium">
          Danh sách sản phẩm
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CopyPlus
                className="hover:cursor-pointer"
                size={18}
                color="#2a435d"
                onClick={() => {
                  handleSetMode("create");
                  handleClearData();
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="rounded-md bg-Charcoal p-2 text-White shadow-sm">
                Thêm mới
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-col">
        <DataTable
          columns={ColumnsProduct}
          data={dataTable}
          totalItems={totalItems}
          setCurrentPage={(page) =>
            setFilterForm((prev: any) => ({ ...prev, page }))
          }
          currentPage={filterForm.page}
          loading={loading}
          itemsPerPage={filterForm.limit}
          setItemsPerPage={(limit) =>
            setFilterForm((prev: any) => ({ ...prev, limit }))
          }
        />
      </div>

      <div className="mt-6 border border-LightSilver p-4 rounded-md">
        <div className="flex flex-col gap-4 mb-4">
          <p className="text-black font-sans text-[20px] font-medium text-Charcoal">
            Thông tin sản phẩm
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="product_name"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Tên sản phẩm"
                  error={errors.product_name?.message}
                  disabled={able}
                />
              )}
            />

            <Controller
              name="category_id"
              control={control}
              render={({ field }) => {
                console.log("Current field value:", field.value);
                return (
                  <SelectType
                    data={categoryList}
                    disabled={able}
                    label="Danh mục"
                    error={errors.category_id?.message}
                    value={
                      able
                        ? typeof field.value === "string" && field.value
                          ? categoryList.find((cat) => {
                              return cat.id === field.value;
                            })?.id
                          : ""
                        : field.value
                    }
                    onChange={(e) => field.onChange(e)}
                    className="w-full"
                  />
                );
              }}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  type="number"
                  labelText="Giá sản phẩm"
                  error={errors.price?.message}
                  disabled={able}
                />
              )}
            />

            <Controller
              name="discount_price"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  type="number"
                  labelText="Giá giảm"
                  error={errors.discount_price?.message}
                  disabled={able}
                />
              )}
            />

            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  type="number"
                  labelText="Tồn kho"
                  error={errors.stock?.message}
                  disabled={able}
                />
              )}
            />

            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Mã sản phẩm"
                  error={errors.code?.message}
                  disabled={able}
                />
              )}
            />

            <Controller
              name="warranty"
              control={control}
              render={({ field }) => (
                <InputConfig
                  {...field}
                  labelText="Bảo hành"
                  error={errors.warranty?.message}
                  disabled={able}
                />
              )}
            />

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <CheckboxLabel
                  id="priority"
                  label="Ưu tiên"
                  checked={field.value}
                  onChange={(e) => setValue("priority", e)}
                  disabled={able}
                />
              )}
            />
          </div>

          {/* Phần classification */}
          <div className="mt-4">
            <Label className="text-Charcoal font-semibold text-[16px]">
              Phân loại sản phẩm
            </Label>
            <div className="flex flex-col gap-4 mt-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col gap-4 border border-LightSilver p-4 rounded-md"
                >
                  {/* Classification Items */}
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name={`classification.${index}.classifications`}
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <div className="flex flex-col gap-2">
                          {field.value.map(
                            (item: ClassificationItem, itemIndex: number) => (
                              <div
                                key={itemIndex}
                                className="flex items-end gap-2"
                              >
                                <InputConfig
                                  value={item.classification_name}
                                  onChange={(e) => {
                                    const newValue = [...field.value];
                                    newValue[itemIndex].classification_name =
                                      e.target.value;
                                    field.onChange(newValue);
                                  }}
                                  labelText="Tên phân loại"
                                  placeholder="VD: Size, Màu sắc..."
                                  disabled={able}
                                />
                                <InputConfig
                                  value={item.classification_value}
                                  onChange={(e) => {
                                    const newValue = [...field.value];
                                    newValue[itemIndex].classification_value =
                                      e.target.value;
                                    field.onChange(newValue);
                                  }}
                                  labelText="Giá trị"
                                  placeholder="VD: M, Đỏ..."
                                  disabled={able}
                                />
                                {!able && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    disabled={able}
                                    onClick={() => {
                                      const newValue = [...field.value];
                                      newValue.splice(itemIndex, 1);
                                      field.onChange(newValue);
                                    }}
                                    className="border border-LightSilver rounded-md"
                                  >
                                    Xóa
                                  </Button>
                                )}
                              </div>
                            )
                          )}
                          {!able && (
                            <Button
                              type="button"
                              disabled={able}
                              onClick={() => {
                                field.onChange([
                                  ...field.value,
                                  {
                                    classification_name: "",
                                    classification_value: "",
                                  },
                                ]);
                              }}
                              className="w-fit"
                            >
                              Thêm thuộc tính
                            </Button>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Add Image Upload */}
                  <div className="mt-2">
                    <Label className="mb-2 block">Hình ảnh phân loại</Label>
                    <Controller
                      name={`classification.${index}.images`}
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col gap-2">
                          {/* <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              const input = document.createElement("input");
                              input.type = "file";
                              input.onchange = (e: any) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    field.onChange(reader.result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              };
                              input.click();
                            }}
                            className="w-fit border border-LightSilver"
                            disabled={able}
                          >
                            Thêm ảnh
                          </Button> */}
                          <CustomButtonUploadImage
                            onImageUpload={() => {
                              const input = document.createElement("input");
                              input.type = "file";
                              input.onchange = (e: any) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    field.onChange(reader.result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              };
                              input.click();
                            }}
                            disabled={able}
                          />
                          {field.value && (
                            <div className="relative w-24">
                              <img
                                src={
                                  field.value?.startsWith("data:image")
                                    ? field.value
                                    : process.env.NEXT_PUBLIC_BASE_URL_IMAGE +
                                      field.value
                                }
                                alt=""
                                className="h-24 w-24 rounded object-contain"
                              />
                              {!able && (
                                <button
                                  type="button"
                                  className="absolute right-0 top-0 h-6 w-6 rounded-full bg-red-500 text-white"
                                  onClick={() => {
                                    const currentImagesDelete =
                                      getValues("images_delete") || [];
                                    if (!field.value.startsWith("data:image")) {
                                      setValue("images_delete", [
                                        ...currentImagesDelete,
                                        field.value,
                                      ]);
                                    }
                                    field.onChange("");
                                  }}
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Price and Remaining */}
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name={`classification.${index}.price`}
                      control={control}
                      render={({ field }) => (
                        <InputConfig
                          {...field}
                          type="number"
                          labelText="Giá"
                          error={errors.classification?.[index]?.price?.message}
                          disabled={able}
                        />
                      )}
                    />

                    <Controller
                      name={`classification.${index}.remaining`}
                      control={control}
                      render={({ field }) => (
                        <InputConfig
                          {...field}
                          type="number"
                          labelText="Tồn kho"
                          error={
                            errors.classification?.[index]?.remaining?.message
                          }
                          disabled={able}
                        />
                      )}
                    />
                  </div>

                  {!able && (
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => remove(index)}
                      className="w-fit bg-PersianRed text-White"
                    >
                      Xóa phân loại
                    </Button>
                  )}
                </div>
              ))}

              {!able && (
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      images: "",
                      classifications: [
                        { classification_name: "", classification_value: "" },
                      ],
                      price: 0,
                      remaining: 0,
                    })
                  }
                  className="w-fit"
                >
                  Thêm nhóm phân loại
                </Button>
              )}
            </div>
          </div>

          <div className="mt-3">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextAreaConfig
                  {...field}
                  label="Mô tả sản phẩm"
                  error={errors.description?.message}
                  disabled={able}
                />
              )}
            />
          </div>

          <div className="mt-3">
            <Label className="mb-2 block">Hình ảnh</Label>
            {(mode === "edit" || mode === "create") && (
              <CustomButtonUploadImage
                onImageUpload={handleImageUpload}
                disabled={able}
                multiple={true}
                maxFileSize={1000}
                maxFiles={10}
                buttonText="Tải ảnh sản phẩm"
              />
            )}
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images.message}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {imageList?.map((image: string, index) => (
                <div key={index} className="relative">
                  <img
                    src={
                      image?.startsWith("data:image")
                        ? image
                        : process.env.NEXT_PUBLIC_BASE_URL_IMAGE + image
                    }
                    alt=""
                    className="h-24 w-24 rounded object-contain"
                  />
                  {!able && (
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-6 w-6 rounded-full bg-red-500 text-white"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            {mode === "edit" && (
              <div className="flex gap-4">
                <Button type="submit" className="bg-Charcoal text-White">
                  Cập nhật
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setDialogOpen(true)}
                >
                  Xóa
                </Button>
              </div>
            )}

            {mode === "view" && (
              <Button
                type="button"
                className="bg-Charcoal text-White"
                onClick={() => {
                  setAble(false);
                  handleSetMode("edit");
                }}
              >
                Chỉnh sửa
              </Button>
            )}

            {mode === "create" && (
              <Button type="submit" className="bg-Charcoal text-White">
                Thêm mới
              </Button>
            )}
          </div>
        </form>
      </div>

      <AlertOption
        isOpen={isDialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={() => product._id && handleDeleteProduct(product._id)}
      />
      {showAlertSuccess && <AlertSuccess description={alertDescription} />}
      {showAlertError && <AlertError description={alertDescription} />}
    </div>
  );
};

export default Page;
