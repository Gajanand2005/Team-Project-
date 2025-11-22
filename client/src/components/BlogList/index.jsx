import React from 'react'
import BlogItem from '../Blogitem'

const blogData = [
  {
    id: 1,
    image: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/psblog/b/lg-b-blog-6.jpg",
    date: "5 APRIL, 2023",
    title: "Nullam ullamcorper ornare molestie",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    link: "/blog/nullam-ullamcorper-nisl-quis-ornare-molestie"
  },
  {
    id: 2,
    image: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/psblog/b/lg-b-blog-5.jpg",
    date: "3 APRIL, 2023",
    title: "Turpis at eleifend Aenean porta",
    excerpt: "Turpis at eleifend ps mi elit Aenean porta ac sed faucibus. Nunc urna...",
    link: "/blog/turpis-at-eleifend-aenean-porta"
  },
  {
    id: 3,
    image: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/psblog/b/lg-b-blog-7.jpg",
    date: "1 APRIL, 2023",
    title: "Morbi condimentum velit",
    excerpt: "Sed mauris Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    link: "/blog/morbi-condimentum-velit"
  }
]

const BlogList = () => {
  return (
    <div className='blogList grid grid-cols-1 md:grid-cols-3 gap-4'>
      {blogData.map(blog => (
        <BlogItem
          key={blog.id}
          image={blog.image}
          date={blog.date}
          title={blog.title}
          excerpt={blog.excerpt}
          link={blog.link}
        />
      ))}
    </div>
  )
}

export default BlogList
