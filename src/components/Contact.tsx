export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-12">CONTACT</h2>
        
        <div className="mb-12">
          <a 
            href="mailto:zhu.ziyi@outlook.com"
            className="text-3xl md:text-4xl hover:text-red-500 transition-colors"
          >
            zhu.ziyi@outlook.com
          </a>
        </div>

        <div className="flex space-x-8 text-xl">
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
          >
            YOUTUBE
          </a>
          <a 
            href="https://unsplash.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
          >
            UNSPLASH
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </section>
  );
}
