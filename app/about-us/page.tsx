'use client'
import { Separator } from '@/components/ui/separator'
import IconTourProvider from '@/provider/icon-tour-provider'
import { FunctionComponent } from 'react'
import CallToAction from '../(components)/(fifth)/call-to-action'
import { useTourTypes } from '@/hooks/react-query/use-tour-types'
import BlurImage from '@/components/common/blur-image'
import Breadcrumbs from '@/components/common/bread-crumbs'
import BreadcrumbItems from '@/components/common/bread-crumb-item'

interface AboutUsPageProps {}

const AboutUsPage: FunctionComponent<AboutUsPageProps> = () => {
  const { data, isLoading } = useTourTypes()
  return (
    <>
      <div className="container">
        <Breadcrumbs>
          <BreadcrumbItems href="/">الرئيسية</BreadcrumbItems>
          <BreadcrumbItems href="/about-us">عن دسكفري</BreadcrumbItems>
        </Breadcrumbs>
        <Separator className="my-4" />
        <div className="grid grid-cols-12 gap-x-8 gap-y-4">
          <div className="col-span-12 lg:col-span-6">
            <h1 className="text-primary text-2xl">تعرف على رفيق سفرك الجديد</h1>
            <p className="mt-4">
              شركة إبريل تورز هي وكالة سفريات كاملة الخدمات في مدينة القدس. نحن نفتخر بتوفير خدمات السفر الشاملة لعملائنا في جميع أنحاء العالم. سواء
              كنت تبحث عن تنظيم رحلة عائلية، رحلة تجارية، رحلة مغامرة أو رحلة استجمام فاخرة، فإبريل تورز هي الخيار الأمثل لك. تتميز إبريل تورز بفريق
              متخصص من خبراء السفر المحترفين الذين يعملون بجد لتلبية احتياجاتك وتفضيلاتك الفردية. نحن نقدم باقات سفر مخصصة وفقًا لمتطلباتك، بغض النظر
              عن وجهتك المفضلة. مع إبريل تورز، يمكنك استكشاف وجهات سياحية متنوعة في جميع أنحاء العالم. سواء كنت تحلم بزيارة الأماكن التاريخية الشهيرة
              مثل أهرامات الجيزة في مصر أو مدينة البندقية الرومانسية في إيطاليا، أو رحلة إلى جمال الطبيعة في جزر المالديف أو جبال الألب السويسرية،
              فإبريل تورز ستوفر لك تجربة لا تنسى. نحن نضمن لكم تجربة سفر مريحة وممتعة من خلال توفير خدمات فاخرة وجودة عالية. نحن نعمل مع شركاء موثوق
              بهم في صناعة السفر لضمان حصولك على أفضل خدمة ممكنة. بغض النظر عما إذا كنت بحاجة إلى حجز تذاكر طيران، حجز فنادق، ترتيبات للنقل، أو تنظيم
              رحلات يومية وجولات سياحية، فإبريل تورز ستكون معك خطوة بخطوة. نحن نهتم بتفاصيل رحلتك بشكل كامل، من التخطيط وحتى عودتك بسلام. نحن نوفر
              أفضل الخدمات الاستشار
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-2 gap-3 ">
              {data?.results?.map((item) => (
                <div className="shadow-medium grid gap-y-2 justify-items-center p-4 rounded-medium" key={item.id}>
                  <IconTourProvider>
                    <BlurImage
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image}`}
                      alt={item.name || ''}
                      width={300}
                      height={150}
                      className="max-w-[50px]"
                    />
                  </IconTourProvider>
                  <h3 className="text-xl font-bold text-center mb-2">{item.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-4" />
      </div>
      <CallToAction />
    </>
  )
}

export default AboutUsPage
