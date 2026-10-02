import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-sm text-accent-strong">404 · not found</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">This page doesn&apos;t exist</h1>
      <p className="mt-4 max-w-lg text-text">The link may be outdated. Everything else is one click away.</p>
      <ButtonLink href="/" className="mt-8">
        Back to the home page
      </ButtonLink>
    </section>
  );
}
