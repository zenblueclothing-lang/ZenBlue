import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";
import { PageHeader } from "@/components/storefront/PageHeader";
import { BulkEnquiryForm } from "@/components/storefront/BulkEnquiryForm";
import { StoreImage } from "@/components/storefront/StoreImage";

export const metadata: Metadata = {
  title: "Bulk & Corporate Orders",
  description:
    "Corporate gifting, wedding parties and team uniforms in ZEN BLUE™ menswear. Tell us what you need and we will quote within one working day.",
};

export default async function BulkOrdersPage() {
  const settings = await getSiteSettings();
  const { integrations, contact, brand, bulkOrders } = settings;

  return (
    <main>
      <PageHeader
        title="Bulk & Corporate Orders"
        subtitle={`Corporate gifting, wedding parties, team uniforms and retail wholesale — ${brand.storeName} menswear made to your quantity, your colours and your date.`}
        breadcrumbs={[{ name: "Bulk Orders", path: "/bulk-orders" }]}
        compact
      />

      <section id="bulk-order-form" className="mx-auto max-w-page scroll-mt-28 px-4 py-5 sm:px-6 sm:py-7">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-8">
          <div className="min-w-0">
            <h2 className="font-display text-xl text-heading sm:text-2xl">Request a quote</h2>
            <p className="mt-1.5 text-sm text-body">
              Share the quantity, styles and date so we can prepare an accurate quotation.
            </p>
            <div className="mt-4">
              <BulkEnquiryForm whatsappNumber={integrations.whatsappNumber} />
            </div>
          </div>

          <aside className="lg:pt-14">
            <div className="rounded-lg border border-line bg-surface p-4">
              <h3 className="text-sm font-medium text-heading">Rather talk it through?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-body">Our bulk desk is open Monday to Saturday.</p>
              <dl className="mt-4 space-y-2 text-sm">
                {contact.phone && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Phone</dt>
                    <dd><a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="text-link underline-offset-4 hover:underline">{contact.phone}</a></dd>
                  </div>
                )}
                {(contact.supportEmail || contact.email) && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Email</dt>
                    <dd className="break-all"><a href={`mailto:${contact.supportEmail || contact.email}`} className="text-link underline-offset-4 hover:underline">{contact.supportEmail || contact.email}</a></dd>
                  </div>
                )}
                {contact.businessHours && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Hours</dt>
                    <dd className="text-body">{contact.businessHours}</dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-surface-alt">
        <div className="mx-auto grid max-w-page items-center gap-5 px-4 py-7 sm:px-6 sm:py-9 lg:grid-cols-2 lg:gap-8">
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-surface">
            {bulkOrders.introImage && <StoreImage src={bulkOrders.introImage} alt={bulkOrders.introHeading} width={1200} sizes="(max-width: 1024px) 100vw, 50vw" className="absolute inset-0 h-full w-full object-cover" />}
          </div>
          <div className="max-w-xl">
            {bulkOrders.introEyebrow && <p className="eyebrow">{bulkOrders.introEyebrow}</p>}
            <h2 className="mt-1.5 font-display text-xl font-semibold leading-tight text-heading sm:text-2xl">{bulkOrders.introHeading}</h2>
            <p className="mt-3 text-sm leading-6 text-body">{bulkOrders.introBody}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-7 sm:px-6 sm:py-9">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-xl font-semibold text-heading sm:text-2xl">{bulkOrders.offeringsHeading}</h2>
          {bulkOrders.offeringsIntro && <p className="mt-2 text-sm leading-6 text-body">{bulkOrders.offeringsIntro}</p>}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {bulkOrders.offerings.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-xl border border-line bg-surface">
              <div className="relative aspect-[3/2] bg-surface-alt">
                {item.image && <StoreImage src={item.image} alt={item.title} width={900} sizes="(max-width: 768px) 100vw, 33vw" className="absolute inset-0 h-full w-full object-cover" />}
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-heading">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-5 text-body">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface-alt">
        <div className="mx-auto max-w-page px-4 py-7 sm:px-6 sm:py-9">
          <div className="max-w-2xl">
            <h2 className="font-display text-xl font-semibold text-heading sm:text-2xl">{bulkOrders.processHeading}</h2>
            {bulkOrders.processIntro && <p className="mt-2 text-sm leading-6 text-body">{bulkOrders.processIntro}</p>}
          </div>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {bulkOrders.steps.map((step, index) => (
              <li key={`${step.title}-${index}`} className="rounded-lg border border-line bg-surface p-4">
                <span className="text-xs font-semibold tracking-[0.18em] text-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2.5 text-sm font-semibold text-heading">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-5 text-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-7 sm:px-6 sm:py-9">
        <div className="grid overflow-hidden rounded-xl border border-line bg-surface lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[220px] bg-surface-alt lg:min-h-[300px]">
            {bulkOrders.closingImage && <StoreImage src={bulkOrders.closingImage} alt={bulkOrders.closingHeading} width={1200} sizes="(max-width: 1024px) 100vw, 45vw" className="absolute inset-0 h-full w-full object-cover" />}
          </div>
          <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-8">
            <h2 className="font-display text-xl font-semibold leading-tight text-heading sm:text-2xl">{bulkOrders.closingHeading}</h2>
            <p className="mt-3 text-sm leading-6 text-body">{bulkOrders.closingBody}</p>
            {bulkOrders.ctaLabel && bulkOrders.ctaLink && (
              <Link href={bulkOrders.ctaLink} className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                {bulkOrders.ctaLabel}<ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
