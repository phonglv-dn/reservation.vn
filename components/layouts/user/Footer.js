import React from 'react'
import { BsFacebook, BsInstagram, BsYoutube, BsPinterest } from 'react-icons/bs'
import { Container, Row, Col } from 'react-bootstrap'

export default function Footer () {
  return (
    <div className='us-footer border-top align-items-center'>
      <Container>
        <Row>
          <Col md={3} className='text-start'>
            <a href='#' className='footer-site-logo mb-3 d-block'>Reservation.vn</a>
            <ul className='list-unstyled social nav-right font-semibold'>
              <li><a href='#'><BsFacebook className='me-3' />Facebook</a></li>
              <li><a href='#'><BsInstagram className='me-3' />Instagram</a></li>
              <li><a href='#'><BsYoutube className='me-3' />Youtube</a></li>
              <li><a href='#'><BsPinterest className='me-3' />Pinterest</a></li>
            </ul>
          </Col>
          <Col md={2} className='text-start ms-auto text-sm'>
            <h3 className='mb-3 fw-bold'>Về chúng tôi</h3>
            <ul className='list-unstyled links font-semibold'>
              <li><a href='#'>Liên lạc</a></li>
              <li><a href='#'>Trợ giúp</a></li>
              <li><a href='#'>Dịch vụ</a></li>
              <li><a href='#'>Đội ngũ</a></li>
            </ul>
          </Col>
          <Col md={2} className='text-start ms-auto text-sm'>
            <h3 className='mb-3 fw-bold'>Sản phẩm</h3>
            <ul className='list-unstyled links font-semibold'>
              <li><a href='#'>Khách sạn</a></li>
              <li><a href='#'>Trải nghiệm & Tích lũy</a></li>
            </ul>
          </Col>
          <Col md={2} className='text-start ms-auto text-sm'>
            <h3 className='mb-3 fw-bold'>Khác</h3>
            <ul className='list-unstyled links font-semibold'>
              <li><a href='#'>Blogs</a></li>
              <li><a href='#'>Chính sách bảo mật</a></li>
              <li><a href='#'>Điều khoản và điều kiện</a></li>
              <li><a href='#'>Đăng ký đối tác</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
