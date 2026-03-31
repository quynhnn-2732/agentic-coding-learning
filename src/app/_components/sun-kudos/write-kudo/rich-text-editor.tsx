'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { BoldIcon } from '../../icons/bold-icon'
import { ItalicIcon } from '../../icons/italic-icon'
import { StrikethroughIcon } from '../../icons/strikethrough-icon'
import { ListIcon } from '../../icons/list-icon'
import { LinkIcon } from '../../icons/link-icon'
import { QuoteIcon } from '../../icons/quote-icon'
import { AddLinkDialog } from './add-link-dialog'

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  error?: string
}

export function RichTextEditor({ value, onChange, error }: RichTextEditorProps) {
  const t = useTranslations('WriteKudo')
  const tToolbar = useTranslations('RichTextToolbar')
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-[var(--color-link-text)] underline' },
      }),
      Placeholder.configure({
        placeholder: t('editorPlaceholder'),
      }),
    ],
    content: value,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[180px] px-6 py-4 outline-none font-montserrat text-base font-bold leading-6 text-[var(--color-bg-dark)]',
      },
    },
  })

  if (!editor) return null

  const borderClass = error
    ? 'border-[var(--color-error)]'
    : 'border-[var(--color-btn-kudos-border)]'

  const toolbarButtons = [
    { icon: BoldIcon, action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), label: tToolbar('bold') },
    { icon: ItalicIcon, action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), label: tToolbar('italic') },
    { icon: StrikethroughIcon, action: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike'), label: tToolbar('strikethrough') },
    { icon: ListIcon, action: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList'), label: tToolbar('numberedList') },
    { icon: LinkIcon, action: () => setIsLinkDialogOpen(true), isActive: editor.isActive('link'), label: tToolbar('insertLink') },
    { icon: QuoteIcon, action: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote'), label: tToolbar('quote') },
  ]

  const handleLinkSave = (text: string, url: string) => {
    if (editor.state.selection.empty) {
      editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run()
    } else {
      editor.chain().focus().setLink({ href: url }).run()
    }
    setIsLinkDialogOpen(false)
  }

  const getSelectedText = () => {
    const { from, to } = editor.state.selection
    return editor.state.doc.textBetween(from, to, '')
  }

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className={`flex flex-row items-center border ${borderClass} rounded-t-[var(--radius-kudos-btn-gift)] bg-white`}>
        {toolbarButtons.map(({ icon: Icon, action, isActive, label }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            aria-label={label}
            aria-pressed={isActive}
            className={`flex h-12 w-12 items-center justify-center transition-colors duration-100 ${
              isActive
                ? 'bg-[var(--color-hashtag-selected)] text-[var(--color-bg-dark)]'
                : 'text-[var(--color-bg-dark)] hover:bg-[var(--color-hashtag-selected)]'
            }`}
          >
            <Icon size={24} />
          </button>
        ))}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="ml-auto px-4 font-montserrat text-base font-bold text-[var(--color-link-text)] hover:underline"
        >
          {t('communityStandards')}
        </a>
      </div>

      {/* Editor Area */}
      <div className={`border border-t-0 ${borderClass} rounded-b-[var(--radius-kudos-btn-gift)] bg-white`}>
        <EditorContent editor={editor} />
      </div>

      {/* Hint */}
      <p className="mt-1 font-montserrat text-base font-bold leading-6 text-[var(--color-kudos-text-secondary)]">
        {t('mentionHint')}
      </p>

      {/* Add Link Dialog */}
      {isLinkDialogOpen && (
        <AddLinkDialog
          initialText={getSelectedText()}
          onSave={handleLinkSave}
          onCancel={() => setIsLinkDialogOpen(false)}
        />
      )}
    </div>
  )
}
