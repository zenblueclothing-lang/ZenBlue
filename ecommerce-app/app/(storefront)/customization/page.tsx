import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";
import { PageHeader } from "@/components/storefront/PageHeader";
import { BulkEnquiryForm } from "@/components/storefront/BulkEnquiryForm";
import { StoreImage } from "@/components/storefront/StoreImage";

export const metadata: Metadata = {
  title: "Customization",
  description:
    "Monograms, embroidery, custom colourways and made-to-measure fits on ZEN BLUE™ menswear. Tell us what you have in mind and we will quote within one working day.",
};

/**
 * Customisation enquiries.
 *
 * Shares the enquiry form with /bulk-orders rather than duplicating it: the
 * fields a quote needs are identical (what, how many, by when, what branding),
 * and `kind="custom"` is what changes the copy, the quantity bands and the
 * subject line the enquiry lands under. A single piece is a valid customisation
 * order, which is the one place the two genuinely differ.
 */
export default async function CustomizationPage() {
  const settings = await getSiteSettings();
  const { integrations, contact, brand, customization } = settings;

  return (
    <main>
      <PageHeader
        title="Customization"
        subtitle={`Monograms, embroidery, custom colourways and made-to-measure fits — ${brand.storeName} finished exactly how you want it.`}
        breadcrumbs={[{ name: "Customization", path: "/customization" }]}
        compact
      />

      <section id="customization-form" className="mx-auto max-w-page scroll-mt-28 px-4 py-5 sm:px-6 sm:py-7">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-8">
          <div className="min-w-0">
            <h2 className="font-display text-xl text-heading sm:text-2xl">Tell us what you need</h2>
            <p className="mt-1.5 text-sm text-body">
              One piece or a hundred — describe the change and we will price it.
            </p>
            <div className="mt-4">
              <BulkEnquiryForm kind="custom" whatsappNumber={integrations.whatsappNumber} />
            </div>
          </div>

          <aside className="lg:pt-14">
            <div className="rounded-lg border border-line bg-surface p-4">
              <h3 className="text-sm font-medium text-heading">Sending artwork?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-body">
                Vector files (AI, EPS, SVG or PDF) reproduce best. Email or WhatsApp them across
                and we will return a placement mock-up with the quote.
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                {(contact.supportEmail || contact.email) && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Email</dt>
                    <dd className="break-all">
                      <a
                        href={`mailto:${contact.supportEmail || contact.email}`}
                        className="text-link underline-offset-4 hover:underline"
                      >
                        {contact.supportEmail || contact.email}
                      </a>
                    </dd>
                  </div>
                )}
                {contact.phone && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted">Phone</dt>
                    <dd>
                      <a
                        href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                        className="text-link underline-offset-4 hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </dd>
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
            {customization.introImage && (
              <StoreImage src={customization.introImage} alt={customization.introHeading} width={1200} sizes="(max-width: 1024px) 100vw, 50vw" className="absolute inset-0 h-full w-full object-cover" />
            )}
          </div>
          <div className="max-w-xl">
            {customization.introEyebrow && <p className="eyebrow">{customization.introEyebrow}</p>}
            <h2 className="mt-1.5 font-display text-xl font-semibold leading-tight text-heading sm:text-2xl">{customization.introHeading}</h2>
            <p className="mt-3 text-sm leading-6 text-body">{customization.introBody}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-7 sm:px-6 sm:py-9">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-xl font-semibold text-heading sm:text-2xl">{customization.offeringsHeading}</h2>
          {customization.offeringsIntro && <p className="mt-2 text-sm leading-6 text-body">{customization.offeringsIntro}</p>}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {customization.offerings.map((item) => (
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
            <h2 className="font-display text-xl font-semibold text-heading sm:text-2xl">{customization.processHeading}</h2>
            {customization.processIntro && <p className="mt-2 text-sm leading-6 text-body">{customization.processIntro}</p>}
          </div>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {customization.steps.map((step, index) => (
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
            {customization.closingImage && <StoreImage src={customization.closingImage} alt={customization.closingHeading} width={1200} sizes="(max-width: 1024px) 100vw, 45vw" className="absolute inset-0 h-full w-full object-cover" />}
          </div>
          <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-8">
            <h2 className="font-display text-xl font-semibold leading-tight text-heading sm:text-2xl">{customization.closingHeading}</h2>
            <p className="mt-3 text-sm leading-6 text-body">{customization.closingBody}</p>
            {customization.ctaLabel && customization.ctaLink && (
              <Link href={customization.ctaLink} className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                {customization.ctaLabel}<ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
