import React from 'react'
import BlogRelated from '../../../components/layouts/user/blogs/BlogRelated'
import Layout from '../../../components/layouts/user/Layout'
import SingleBlogs from '../../../components/layouts/user/SingleBlogs'

export default function blogCard () {
  return (
    <>
      <SingleBlogs />
      <BlogRelated />
    </>
  )
}
blogCard.getLayout = function getLayout (page) {
  return (
    <Layout pageMeta={{
      title: 'Blogs details'
    }}
    >
      {page}
    </Layout>
  )
}
