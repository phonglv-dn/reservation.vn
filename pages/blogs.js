import React from 'react'
import RelatedStays from '../components/layouts/user/related-stays/RelatedStays'
import Layout from '../components/layouts/user/Layout'
export default function blogs () {
  return (
    <RelatedStays />
  )
}
blogs.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Blogs'
    }}
    >
      {page}
    </Layout>
  )
}
