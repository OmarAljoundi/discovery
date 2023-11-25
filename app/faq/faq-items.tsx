'use client'
import { Setting } from '@/types/custom'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { FunctionComponent } from 'react'

interface FaqItemsProps {
  data: Setting | undefined
}

const FaqItems: FunctionComponent<FaqItemsProps> = ({ data }) => {
  return (
    <Accordion
      showDivider={false}
      className="grid md:grid-cols-2 gap-4 items-start"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            height: 'auto',
            transition: {
              height: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                duration: 1,
              },
              opacity: {
                easings: 'ease',
                duration: 1,
              },
            },
          },
          exit: {
            y: -10,
            opacity: 0,
            height: 0,
            transition: {
              height: {
                easings: 'ease',
                duration: 0.25,
              },
              opacity: {
                easings: 'ease',
                duration: 0.3,
              },
            },
          },
        },
      }}
    >
      {(data?.faq ?? []).map((f) => (
        <AccordionItem
          key={f.uuid}
          aria-label={f.title}
          title={f.title}
          indicator={({ isOpen }) => (isOpen ? <MinusCircle className="rotate-90 text-primary/50" /> : <PlusCircle className="text-primary" />)}
          classNames={{
            base: 'shadow-medium rounded-medium px-4 py-2 md:py-4',
            title: 'text-base md:text-lg',
          }}
        >
          {f.description}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default FaqItems
