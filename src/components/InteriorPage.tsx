import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CaretRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./InteriorPage.module.css";

type PageLink = { label: string; href: string };

export function InteriorPageHeader({
  title,
  description,
  breadcrumb,
  parent,
  image,
  children,
}: {
  title: string;
  description: string;
  breadcrumb?: string;
  parent?: PageLink;
  image?: { src: string; alt: string; position?: string };
  children?: ReactNode;
}) {
  return (
    <section className={styles.header} aria-labelledby="page-title">
      <div className={`container mx-auto px-4 ${styles.headerInner}`}>
        <div className={styles.copy}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              {parent && (
                <li>
                  <CaretRight size={12} aria-hidden="true" />
                  <Link href={parent.href}>{parent.label}</Link>
                </li>
              )}
              <li>
                <CaretRight size={12} aria-hidden="true" />
                <span aria-current="page">{breadcrumb ?? title}</span>
              </li>
            </ol>
          </nav>
          <span className={styles.accent} aria-hidden="true" />
          <h1 id="page-title" className={styles.title}>
            {title}
          </h1>
          <p className={styles.description}>{description}</p>
          {children && <div className={styles.actions}>{children}</div>}
        </div>
        {image && (
          <div className={styles.photo}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 32vw, 100vw"
              style={{ objectPosition: image.position ?? "center" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function PageSectionNav({ links }: { links: PageLink[] }) {
  return (
    <nav aria-label="On this page" className={styles.sectionNav}>
      <div className="container mx-auto px-4">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function PageAction({
  href,
  children,
  secondary = false,
}: { href: string; children: ReactNode; secondary?: boolean }) {
  return (
    <Link
      href={href}
      className={`${styles.button} ${secondary ? styles.secondary : styles.primary}`}
    >
      {children}
      <ArrowRight size={17} aria-hidden="true" className="shrink-0" />
    </Link>
  );
}

export function PageAssistance({
  title = "Need help with your next step?",
  description,
  href = "/contact",
  action = "Contact the Council",
}: { title?: string; description: string; href?: string; action?: string }) {
  return (
    <section className={styles.assistance}>
      <div className={`container mx-auto px-4 ${styles.assistanceInner}`}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <PageAction href={href} secondary>
          {action}
        </PageAction>
      </div>
    </section>
  );
}
