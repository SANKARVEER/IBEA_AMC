import React from 'react'
// import './index.css'

function Footer() {
    return (
        <>
           <footer className="footer">
        <p>© {new Date().getFullYear()} Ibea Elevators Pvt. Ltd. All rights reserved.</p>
      </footer>
        </>
    )
} export default Footer 


// import React,{useState} from 'react'
// import './index.css'
// import classnames from "classnames";
// import {
//     Button,
//     Card,
//     CardHeader,
//     CardBody,
//     CardTitle,
//     Label,
//     FormGroup,
//     Form,
//     Input,
//     InputGroupAddon,
//     InputGroupText,
//     InputGroup,
//     Container,
//     Row,
//     Col
//   } from "reactstrap";

// function Footer() {


//     return (
//         <>
//             <div
//                 className="contactus-1 section-image"
//                 style={{backgroundColor:'palegreen'}}
//             >
//                 <Container>
//                     <Row>
//                         <Col md="5">
//                             <h2 className="title">Get in Touch</h2>
//                             <h4 className="description">
//                                 You need more information? Check what other persons are saying
//                                 about our product. They are very happy with their purchase.
//                             </h4>
//                             <div className="info info-horizontal">
//                                 <div className="icon icon-primary">
//                                     <i className="tim-icons icon-square-pin" />
//                                 </div>
//                                 <div className="description">
//                                     <h4 className="info-title">Find us at the office</h4>
//                                     <p className="description">
//                                         Bld Mihail Kogalniceanu, nr. 8, <br />
//                                         7652 Bucharest, <br />
//                                         Romania
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="info info-horizontal">
//                                 <div className="icon icon-primary">
//                                     <i className="tim-icons icon-mobile" />
//                                 </div>
//                                 <div className="description">
//                                     <h4 className="info-title">Give us a ring</h4>
//                                     <p className="description">
//                                         Michael Jordan <br />
//                                         +40 762 321 762 <br />
//                                         Mon - Fri, 8:00-22:00
//                                     </p>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col className="ml-auto mr-auto" md="5">
//                             <Card className="card-contact card-raised">
//                                 <Form id="contact-form-2" method="post" role="form">
//                                     <CardHeader className="text-center">
//                                         <CardTitle tag="h4">Contact Us</CardTitle>
//                                     </CardHeader>
//                                     <CardBody>
//                                         <Row>
//                                             <Col md="6">
//                                                 <label>First name</label>
//                                                 <InputGroup
//                                                     className="input-group-focus"
                                                   
//                                                 >
//                                                     <Input
//                                                         aria-label="First Name..."
//                                                         placeholder="First Name..."
//                                                         type="text"
//                                                     />
//                                                 </InputGroup>
//                                             </Col>
//                                             <Col className="pl-2" md="6">
//                                                 <FormGroup>
//                                                     <label>Last name</label>
//                                                     <InputGroup
                                                        
//                                                     >
                                                        
//                                                         <Input
//                                                             aria-label="Last Name..."
//                                                             placeholder="Last Name..."
//                                                             type="text"
//                                                         />
//                                                     </InputGroup>
//                                                 </FormGroup>
//                                             </Col>
//                                         </Row>
//                                         <FormGroup>
//                                             <label>Email address</label>
//                                             <InputGroup
//                                             >
                                               
//                                                 <Input
//                                                     placeholder="Email Here..."
//                                                     type="text"
//                                                 />
//                                             </InputGroup>
//                                         </FormGroup>
//                                         <FormGroup>
//                                             <label>Your message</label>
//                                             <Input
//                                                 id="message-2"
//                                                 name="message"
//                                                 rows="6"
//                                                 type="textarea"
//                                             />
//                                         </FormGroup>
//                                         <Row>
//                                             <Col md="6">
//                                                 <FormGroup check>
//                                                     <Label check>
//                                                         <Input type="checkbox" />
//                                                         <span className="form-check-sign" />
//                                                         I'm not a robot
//                                                     </Label>
//                                                 </FormGroup>
//                                             </Col>
//                                             <Col md="6">
//                                                 <Button
//                                                     className="btn-round pull-right"
//                                                     color="primary"
//                                                 >
//                                                     Send Message
//                                                 </Button>
//                                             </Col>
//                                         </Row>
//                                     </CardBody>
//                                 </Form>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </>
//     )
// } export { Footer }
