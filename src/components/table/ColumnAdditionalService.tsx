'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import { setMode } from '@/store/slices/modeSlice';
import {
  setAdditionalService,
  setIsDeleteAdditionalService,
} from '@/store/slices/additionalServiceSlice';
import {
  APIDeleteAdditionalServices,
  APIGetAdditionalServicesById,
} from '@/services/additionalService';
import { Trash2 } from 'lucide-react';
import AlertOption from '../alert/AlertOption';
import { useState } from 'react';
const urlImg = process.env.NEXT_PUBLIC_BASE_URL_IMAGE;
const ColumnsAdditionalService: ColumnDef<{
  _id?: string;
  service_name?: string;
  description?: string;
}>[] = [
  {
    accessorKey: 'index',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        STT
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row, table }) => {
      const param = useSearchParams();
      const currentPage = param.get('page') ? Number(param.get('page')) - 1 : 0;
      const pageSize = table.getState().pagination.pageSize;
      const index = currentPage * pageSize + row.index + 1;
      return <div className="w-16 text-center font-bold">{index}</div>; // Hiển thị số thứ tự
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => rowA.index - rowB.index,
  },
  {
    accessorKey: 'service_name',
    header: () => {
      return <p className="w-[200px] text-center">Lý do</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="w-[200px] text-center font-bold">
          {row.original.service_name}
        </div>
      ); // Hiển thị số thứ tự
    },
  },
  {
    accessorKey: 'description',
    header: () => {
      return <p className="w-[200px] text-center">Mô tả</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="w-[200px] text-center">{row.original.description}</div>
      ); // Hiển thị số thứ tự
    },
  },

  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      const dispatch = useDispatch();
      const [isDialogOpen, setDialogOpen] = useState(false);
      const handleViewMode = async (id: string) => {
        try {
          const response = await APIGetAdditionalServicesById(id);
          if (response?.status === 200) {
            dispatch(setAdditionalService(response.data));
            dispatch(setMode({ mode: 'view' }));
          }
        } catch (err) {
          console.error(err);
        }
      };

      const handleDeleteAdditionalService = async (id: string) => {
        try {
          const response = await APIDeleteAdditionalServices(id);
          if (response?.status === 200) {
            dispatch(setIsDeleteAdditionalService(true));
          }
        } catch (err) {
          console.error(err);
        }
      };
      return (
        <div className="flex w-full flex-wrap items-center justify-center gap-1 lg:w-24">
          <button
            className="bg-white flex h-7 w-7 items-center justify-center rounded-md shadow-lg hover:bg-[#e8ebf0]"
            onClick={() => row.original._id && handleViewMode(row.original._id)}
          >
            <img src={'/icons/ic_show.png'} alt="View" className="h-4 w-4" />
          </button>
          <Trash2
            className="h-4 w-4 cursor-pointer"
            onClick={() => setDialogOpen(true)}
          />
          <AlertOption
            isOpen={isDialogOpen}
            onOpenChange={setDialogOpen}
            onConfirm={() =>
              row.original._id &&
              handleDeleteAdditionalService(row.original._id)
            }
          />
        </div>
      );
    },
  },
];

export default ColumnsAdditionalService;
