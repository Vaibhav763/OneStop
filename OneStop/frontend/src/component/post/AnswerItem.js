import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../actions/post';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import MDEditor from '@uiw/react-md-editor';
import Button from 'react-bootstrap/Button';

const AnswerItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    deleteComment
  }) => {
    return (
        <div className='my-3'>
        <Fragment>
            <Card>
                <Card.Header style={{height: '60px'}}>
                    
                    <Container style={{padding: 0, margin:0}}>
                        <Row>
                            <Col sm={6} md={6} >
                                <div className='lead'>
                            <Link to={`/profile/${user}`}>
                                <Image  src={avatar} roundedCircle style={{height: '40px', width: '40px', display:'inline'}} /> {`    `}
                                <h4 style={{display: 'inline', marginTop: '10px'}} >{name}</h4>
                            </Link>
                            </div>
                            </Col>
                            <Col sm={{ span: 3, offset: 2 }} md={{span: 3, offset: 3}}>
                               <div className="datespace">
                                <span>
                                    Posted on {formatDate(date)} {"   "}
                                </span>
                              
                            {!auth.loading && user === auth.user._id && (
                                <button
                                onClick={() => deleteComment(postId, _id)}
                                type="button"
                                className="btn btn-danger"
                                >
                                <i className="fas fa-times" />
                                </button>
                            )}
                              </div>
                            </Col>
                            
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Container style={{padding: 0, margin:"10px"}}>
                            <MDEditor.Markdown
                                source={text}
                                linkTarget="_blank"
                            />
                        </Container>
                    </Card.Text>
                    <Button variant='outline-info'> <i class="fas fa-chevron-up"></i> </Button>
                    <Button variant='outline-info'> <i class="fas fa-chevron-down"></i> </Button>
                </Card.Body>
            </Card>
        </Fragment>
        </div>
    )
}

AnswerItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth
  });

  export default connect(mapStateToProps, { deleteComment })(AnswerItem);
