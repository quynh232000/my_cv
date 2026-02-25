/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";

const SEO = ({ title, description, image, url, author }) => {
  const siteName = "Mr Quynh Portfolio"; // Thay bằng tên web của bạn
  const fullTitle = `${title} | ${siteName}`;
  const defaultDesc = "Khám phá những chia sẻ về công nghệ, thiết kế và lập trình tại Portfolio của mình.";

  return (
    <Helmet>
      {/* Các thẻ Meta cơ bản */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={url || window.location.href} />

      {/* Facebook Open Graph (Giúp share link hiện ảnh và tiêu đề đẹp) */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD (Dữ liệu có cấu trúc cho Google) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": title,
          "image": [image],
          "author": {
            "@type": "Person",
            "name": author || "Mr Quynh",
          },
          "datePublished": new Date().toISOString(),
          "description": description || defaultDesc,
        })}
      </script>
    </Helmet>
  );
};

export default SEO;