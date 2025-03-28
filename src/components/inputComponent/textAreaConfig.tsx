import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ align: ["", "center", "right", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["table"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: true,
  },
};

const formats = [
  // Headings
  "header",

  // Font styles
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",

  // Text alignment & color
  "align",
  "color",
  "background",

  // Paragraphs & Lists
  "blockquote",
  "list",
  "indent",

  // Links & Media
  "link",
  "image",
  "video",

  // Tables
  "table",
  // "table-cell",
  // "table-header",
  // "table-row",

  // Advanced formatting
  "code-block",
  "formula",
  "script",
];

type textAreaConfig = {
  label: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
};

const TextAreaConfig: React.FC<textAreaConfig> = ({
  label,
  type,
  onChange,
  name,
  placeholder,
  value,
  className,
  error,
  disabled,
}) => {
  useEffect(() => {
    async function loadQuill() {
      if (typeof window !== "undefined") {
        const quill = await import("quill");
        const betterTable = await import("quill-better-table");
        quill.default.register({
          "modules/better-table": betterTable.default,
        });
      }
    }
    loadQuill();
  }, []);

  return (
    <div
      className={`flex w-full flex-col gap-1.5 ${className} font-sans font-normal text-Charcoal`}
    >
      <Label htmlFor={name}>{label}</Label>
      <style jsx global>{`
        .ql-editor {
          min-height: 200px;
          max-height: 500px;
          overflow: auto;
        }
        .ql-editor table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }
        .ql-editor td,
        .ql-editor th {
          border: 1px solid #fff;
          padding: 8px;
          min-width: 50px;
        }
        .ql-editor th {
          background-color: #f5f5f5;
          font-weight: bold;
        }
        .ql-editor tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .ql-editor tr:hover {
          background-color: #f5f5f5;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(content: any) => onChange?.(content)}
        placeholder={placeholder}
        readOnly={disabled}
        modules={modules}
        formats={formats}
        className="max-h-[500px] overflow-auto"
      />
      {error && (
        <div className="font-sans text-[12px] font-normal text-PersianRed">
          {error}
        </div>
      )}
    </div>
  );
};

export default TextAreaConfig;
