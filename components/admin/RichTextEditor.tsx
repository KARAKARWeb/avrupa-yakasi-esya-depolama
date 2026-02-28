'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Code,
  Eye,
  FileCode,
  Heading2,
  Heading3,
  Heading4,
  Table as TableIcon
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mode, setMode] = useState<'visual' | 'html'>('visual');
  const [htmlContent, setHtmlContent] = useState(value);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setHtmlContent(html);
      onChange(html);
    },
  });

  if (!editor) {
    return null;
  }

  const MenuButton = ({ onClick, active, children }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        active ? 'bg-gray-200 text-primary' : 'text-gray-600'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center gap-1 flex-wrap">
        {/* Mode Toggle */}
        <div className="flex gap-1 mr-2 border-r pr-2">
          <button
            type="button"
            onClick={() => setMode('visual')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              mode === 'visual' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-1" />
            Visual
          </button>
          <button
            type="button"
            onClick={() => setMode('html')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              mode === 'html' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileCode className="w-4 h-4 inline mr-1" />
            HTML
          </button>
        </div>

        {mode === 'visual' && (
          <>
            {/* Text Formatting */}
            <MenuButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive('bold')}
            >
              <Bold className="w-4 h-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive('italic')}
            >
              <Italic className="w-4 h-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={editor.isActive('underline')}
            >
              <UnderlineIcon className="w-4 h-4" />
            </MenuButton>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Headings */}
            <MenuButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              active={editor.isActive('heading', { level: 2 })}
            >
              <Heading2 className="w-4 h-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              active={editor.isActive('heading', { level: 3 })}
            >
              <Heading3 className="w-4 h-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              active={editor.isActive('heading', { level: 4 })}
            >
              <Heading4 className="w-4 h-4" />
            </MenuButton>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Lists */}
            <MenuButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive('bulletList')}
            >
              <List className="w-4 h-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive('orderedList')}
            >
              <ListOrdered className="w-4 h-4" />
            </MenuButton>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Alignment */}
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              active={editor.isActive({ textAlign: 'left' })}
            >
              <AlignLeft className="w-4 h-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              active={editor.isActive({ textAlign: 'center' })}
            >
              <AlignCenter className="w-4 h-4" />
            </MenuButton>
            <MenuButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              active={editor.isActive({ textAlign: 'right' })}
            >
              <AlignRight className="w-4 h-4" />
            </MenuButton>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Code Block */}
            <MenuButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              active={editor.isActive('codeBlock')}
            >
              <Code className="w-4 h-4" />
            </MenuButton>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Table */}
            <MenuButton
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
              active={editor.isActive('table')}
            >
              <TableIcon className="w-4 h-4" />
            </MenuButton>
          </>
        )}
      </div>

      {/* Editor Content */}
      {mode === 'visual' ? (
        <EditorContent 
          editor={editor} 
          className="prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none 
          [&_.ProseMirror]:outline-none 
          [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:md:text-3xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:text-gray-900 [&_.ProseMirror_h2]:mt-0 [&_.ProseMirror_h2]:mb-6 [&_.ProseMirror_h2]:leading-tight 
          [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:text-gray-900 [&_.ProseMirror_h3]:mt-8 [&_.ProseMirror_h3]:mb-4 [&_.ProseMirror_h3]:leading-snug 
          [&_.ProseMirror_h4]:text-lg [&_.ProseMirror_h4]:font-bold [&_.ProseMirror_h4]:text-gray-900 [&_.ProseMirror_h4]:mt-6 [&_.ProseMirror_h4]:mb-3 [&_.ProseMirror_h4]:leading-snug 
          [&_.ProseMirror_p]:text-base [&_.ProseMirror_p]:text-gray-700 [&_.ProseMirror_p]:leading-relaxed [&_.ProseMirror_p]:mb-4
          [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-6 [&_.ProseMirror_ul]:mb-4
          [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-6 [&_.ProseMirror_ol]:mb-4
          [&_.ProseMirror_li]:mb-1
          [&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:mb-4
          [&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-gray-300 [&_.ProseMirror_th]:p-2 [&_.ProseMirror_th]:bg-gray-100 [&_.ProseMirror_th]:font-bold
          [&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-gray-300 [&_.ProseMirror_td]:p-2"
        />
      ) : (
        <textarea
          value={htmlContent}
          onChange={(e) => {
            setHtmlContent(e.target.value);
            onChange(e.target.value);
          }}
          onBlur={(e) => {
            // HTML moddan çıkarken editor'ı güncelle
            if (editor) {
              editor.commands.setContent(e.target.value);
            }
          }}
          className="w-full p-4 font-mono text-sm min-h-[300px] focus:outline-none resize-none"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
