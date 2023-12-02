import { Separator } from '@/components/ui/separator'
import { FunctionComponent } from 'react'
import CallToAction from '../(components)/(fifth)/call-to-action'
import BlurImage from '@/components/common/blur-image'
import { Metadata } from 'next'
import { getContentData } from '@/lib/operations'
import AboutUsBreadCrumb from './about-us-breadcrumb'

interface AboutUsPageProps {}

const data_solution = [
  {
    label: 'العائلات',
    image: '/images/discovery_logo.png',
  },
  {
    label: 'شهر العسل',
    image: '/images/discovery_logo.png',
  },
  {
    label: 'المجموعات',
    image: '/images/discovery_logo.png',
  },
  {
    label: 'الأفراد',
    image: '/images/discovery_logo.png',
  },
  {
    label: 'المؤسسات',
    image: '/images/discovery_logo.png',
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const response = await getContentData()

  const { description, tags, title } = response?.about_us?.seo || { title: '', description: '', tags: '' }
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Discovery',
    },
    keywords: tags,
  }
}

const AboutUsPage: FunctionComponent<AboutUsPageProps> = () => {
  return (
    <>
      <div className="container mb-10">
        <AboutUsBreadCrumb />
        <Separator className="my-4" />
        <div className=" grid space-y-4 md:space-y-8">
          <div className="shadow-medium rounded-medium py-4 md:px-20">
            <h1 className="text-primary text-2xl lg:text-4xl  text-center">من نحن</h1>
            <p className="mt-4 text-center text-base lg:text-xl">
              ديسكفري هي شركة رائدة في صناعة العطلات السياحية العائلية على مستوى دول الخليج العربي، حيث تقدم تجارب سفر استثنائية وفريدة لعملائها بجودة
              عالية، يوجد لدى ديسكفري فروع في سلطنة عمان والبحرين وقريباً في الإمارات والسعودية.
            </p>
            <h1 className="font-bold text-6xl text-center mt-4 font-specialAr">لكل رحلة .. حكاية</h1>
          </div>

          <div className="shadow-medium rounded-medium py-4 md:px-20">
            <h1 className="text-primary text-2xl lg:text-4xl  text-center">رؤيتنا</h1>
            <p className="mt-4 text-center  text-base lg:text-xl">
              تعزيز مكانتنا كشركة عطلات سياحية رائدة في المنطقة توفر خدمات إبداعية عالية الجودة وتنافسية في نفس الوقت لنكون الخيار الأول دائماً.
            </p>
          </div>

          <div className="shadow-medium rounded-medium py-4 md:px-20">
            <h1 className="text-primary text-2xl lg:text-4xl  text-center">نقدم حلول سفر تناسب الجميع</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
              {data_solution.map((i, index) => (
                <div className="grid bg-secondary shadow-medium rounded-medium p-4 justify-items-center" key={index}>
                  <BlurImage src={i.image} alt="" width={150} height={150} quality={100} loading="eager" className="max-w-[75px]" />
                  <h1 className="font-bold text-base lg:text-xl">{i.label}</h1>
                </div>
              ))}
            </div>
          </div>

          <div className="shadow-medium rounded-medium py-4 md:px-20">
            <h1 className="text-primary text-2xl lg:text-4xl  text-center">لدنيا المزيد</h1>
            <ul className="mt-4 text-right list-disc list-inside text-base lg:text-xl space-y-4 lg:space-y-2 " dir="rtl">
              <li className="text-right">استئجار رحلات جوية بنظام (الجارتر) إلى بعض الوجهات السياحية المهمة خلال مواسم السفر.</li>
              <li className="text-right">
                العمل على دراسات للوجهات السياحية غير الرائجة ووضع الخطط التسويقية والترويجية لها لإستهداف الجمهور وشركات السفر في دول مجلس التعاون
                لتنشيط الحركة السياحية إلى هذه الوجهات في أسواق دول مجلس التعاون.
              </li>
              <li className="text-right">العمل على إدارة الحملات الترويجية للوجهات السياحية.</li>
            </ul>
          </div>
        </div>
      </div>
      <CallToAction />
    </>
  )
}

export default AboutUsPage
