import SectionFeaturedCities from '../components/layouts/user/home/SectionFeaturedCities'
import SectionHero from '../components/layouts/user/home/SectionHero'
import SectionOurFeatures from '../components/layouts/user/home/SectionOurFeatures'
import ListHotelsDemo from '../components/layouts/user/home/ListHotelsDemo'
import Layout from '../components/layouts/user/Layout'
import BlogRelated from '../components/layouts/user/blogs/BlogRelated'
import HomeContact from '../components/layouts/user/HomeContact'

export default function Home () {
  return (
    <>
      <div className='us-home position-relative overflow-hidden'>
        <div className='us-bg-glassmorphism position-absolute d-flex overflow-hidden'>
          <span className='d-block' />
          <span className='d-block' />
        </div>
        <div className='us-home__container position-relative'>
          <SectionHero
            name='Khách sạn, đi & trải nghiệm'
            sub='Đồng hành cùng chúng tôi, bạn có một chuyến đi đầy trải nghiệm. Cùng Reservation.vn đặt phòng nghỉ, biệt thự nghỉ dưỡng, khách sạn'
            location='Điểm đến'
            image='/images/background/banner.png'
          />
          <SectionFeaturedCities />
          <SectionOurFeatures />
          <ListHotelsDemo />
          <BlogRelated />
          <HomeContact />
        </div>
      </div>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: 'Open Sans', sans-serif;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}
      </style>
    </>
  )
}
Home.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Trang chủ'
    }}
    >
      {page}
    </Layout>
  )
}
