'use client'
import * as React from 'react'

import type { Content, Editor } from '@tiptap/react'
import type { UseMinimalTiptapEditorProps } from '@/components/minimal-tiptap/hooks/use-minimal-tiptap'
import { EditorContent } from '@tiptap/react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { SectionOne } from '@/components/minimal-tiptap/components/section/one'
import { SectionTwo } from '@/components/minimal-tiptap/components/section/two'
import { SectionThree } from '@/components/minimal-tiptap/components/section/three'
import { SectionFour } from '@/components/minimal-tiptap/components/section/four'
import { SectionFive } from '@/components/minimal-tiptap/components/section/five'
import { LinkBubbleMenu } from '@/components/minimal-tiptap/components/bubble-menu/link-bubble-menu'
import { useMinimalTiptapEditor } from '@/components/minimal-tiptap/hooks/use-minimal-tiptap'
import { MeasuredContainer } from './minimal-tiptap/components/measured-container'

export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content
  onChange?: (value: Content) => void
  className?: string
  editorContentClassName?: string
  isRtL?: boolean
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-b border-border p-2">
    <div className="flex w-max items-center gap-2">
      <SectionOne editor={editor} activeLevels={[1, 2, 3]} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTwo
        editor={editor}
        activeActions={['italic', 'bold', 'underline', 'code', 'strikethrough', 'clearFormatting']}
        mainActionCount={5}
        variant="outline"
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour editor={editor} activeActions={['bulletList', 'orderedList']} mainActionCount={2} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive editor={editor} activeActions={['blockquote', 'codeBlock', 'horizontalRule']} mainActionCount={3} variant="outline" />
    </div>
  </div>
)

export const RichTextEditor = React.forwardRef<HTMLDivElement, MinimalTiptapProps>(
  ({ value, onChange, className, editorContentClassName, isRtL, ...props }, ref) => {
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onChange,
      ...props,
    })

    if (!editor) {
      return null
    }

    return (
      <MeasuredContainer
        as="div"
        name="editor"
        ref={ref}
        className={cn(
          'flex h-auto min-h-72 w-full flex-col rounded-md border border-input bg-background/40 shadow-sm focus-within:border-primary',
          className,
        )}
      >
        <Toolbar editor={editor} />
        <EditorContent editor={editor} dir={'rtl'} style={{ direction: 'rtl' }} className={cn('minimal-tiptap-editor', editorContentClassName)} />
        <LinkBubbleMenu editor={editor} />
      </MeasuredContainer>
    )
  },
)

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
