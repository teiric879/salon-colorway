import SectionHeading from '@/components/SectionHeading';
import InstagramGrid from '@/components/InstagramGrid';
import { getInstagramPosts } from '@/lib/instagram';
import { instagram } from '@/content/instagram';

/* Server Component: holt die Posts serverseitig (Token bleibt am
   Server) und übergibt sie an das Client-Grid. */
export default async function Instagram() {
  const posts = await getInstagramPosts();

  return (
    <section id="instagram" className="section py-24 lg:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="Aus dem Salon"
          title="Folge uns auf *Instagram.*"
          intro="Tägliche Inspiration, frische Transformationen und Einblicke hinter die Kulissen – direkt aus unserem Salon in Euskirchen."
          align="center"
        />

        <div className="mt-12 lg:mt-16">
          <InstagramGrid
            posts={posts}
            handle={instagram.handle}
            profileUrl={instagram.profileUrl}
          />
        </div>
      </div>
    </section>
  );
}
