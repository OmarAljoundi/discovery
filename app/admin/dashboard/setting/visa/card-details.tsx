'use client'
import { useModal } from '@/hooks/use-modal'
import { useSetting } from '@/hooks/use-setting'
import { PushJsonFile } from '@/lib/storage-operations'
import { Visa, VisaType } from '@/types/custom'
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Switch, Tooltip } from '@nextui-org/react'
import { Edit, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import { toast } from 'sonner'

const CardDetails: FunctionComponent<VisaType> = ({ image, note, period, price, requirements, sub_title, title, uuid }) => {
  const config = useSetting()
  const route = useRouter()

  const handleDelete = () => {
    let newObject = { ...config.setting }
    newObject = {
      ...newObject.home,
      visa: {
        ...newObject.visa?.seo,
        visa_types: [...(newObject.visa?.visa_types?.filter((x) => x.uuid !== uuid) ?? [])],
      },
    }

    const jsonData = JSON.stringify(newObject)
    const blob = new Blob([jsonData], { type: 'application/json' })
    toast.promise(PushJsonFile(blob), {
      loading: 'Saving your changes..',
      error(error) {
        return error
      },
      success() {
        config.onCreate(newObject)
        route.refresh()
        return 'Saved successfully'
      },
    })
  }

  return (
    <Card className="pt-4">
      <CardHeader className="pt-2">
        <div className="flex justify-between w-full">
          <Chip color="primary">{price}</Chip>
          <div className="px-4 grid justify-items-end  text-right w-full">
            <h4 className="font-bold text-large text-right">{title}</h4>
            <h6 className="text-small text-right text-foreground-700">{sub_title}</h6>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2 border-t pb-4">
        <div className="w-full grid justify-items-end">
          <Image
            alt="Card background"
            className="object-cover rounded-xl max-w-[200px]"
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`}
            width={1000}
            height={500}
          />
          <ul className="mt-4 list-decimal px-4" dir="rtl">
            {requirements?.map((x) => (
              <li className="text-right" key={x}>
                {x}
              </li>
            ))}
          </ul>
          <div className="bg-secondary p-2 mt-4 rounded-sm">
            <p className="text-right" dir="rtl">
              {note}
            </p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-2 p-0 border-t">
        <div className="flex gap-1 justify-between items-center w-full pt-3 pb-1 px-4">
          <div className="flex">
            <Button
              isIconOnly
              className="text-default-900/60 data-[hover]:bg-foreground/10 "
              radius="full"
              variant="light"
              as={Link}
              href={`visa/edit/${uuid}`}
            >
              <Edit />
            </Button>
            <Button
              isIconOnly
              className="text-default-900/60   data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
              onPress={() => handleDelete()}
            >
              <Trash />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CardDetails
