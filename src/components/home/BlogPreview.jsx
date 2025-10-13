import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogPreview.css';



export const BlogPreview = () => {

  const [latestPost, setLatestPost] = useState();

  useEffect(() => {
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:AZPo4EA2/blog_post/1') // ajusta si tienes filtro de published=true
      .then((res) => res.json())
      .then((data) => {
        setLatestPost(data);
      })
      .catch((err) => console.error('Error al cargar blog:', err));
  }, []);

  return (
    <section className="blog-preview-section">
      <h2 className="blog-title">{latestPost?.title || 'Cargando...'}</h2>
      <div className="blog-card">
        <div className="blog-content">
          <h3 className="blog-post-title">{latestPost?.excerpt || 'Cargando...'}</h3>
          <Link to={`/blog/${latestPost?.id}`} className="blog-read-more">Leer más →</Link>
        </div>
      </div>
    </section>
  );
}
