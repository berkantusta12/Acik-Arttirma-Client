import React, { useState, useEffect } from "react";
import { makeStyles } from 'tss-react/mui';
import { CssBaseline, Container, Grid, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import PenIcon from '@mui/icons-material/Create';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PostsList from "./components/PostsList";
import AddPostForm from "./components/AddPostForm";
import PostDetails from "./components/PostDetails";
import { fetchPosts } from "./redux/actions/post";
import { Modal } from 'antd';
import { Form, Input, Checkbox } from 'antd';
import "./App.css";






const useStyles = makeStyles()((theme) => {
    return {
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        container: {
            marginTop: theme.spacing(3),
        },
        body: {
            backgroundColor:"#f4f4f4",
        },
        header: {
            backgroundColor: "#f9f9f9",
        }
    };
});






        
       



const mapDispatchToProps = (dispatch) => ({ dispatch });


const App = connect(
    mapDispatchToProps
)(
    ({ dispatch }) => {

        useEffect(() => {
            dispatch(fetchPosts());
        }, [dispatch])

        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => {
            setIsModalOpen(true);
        };
        
        const handleOk = () => {
            // setIsModalOpen(false);
          };
          const handleCancel = () => {
            setIsModalOpen(false);
          };
        useEffect(() => {
            showModal();
        }, []);


        const [isRegister, setIsRegister] = useState(true);
        const showRegister = () => {
            setIsRegister(!isRegister);
            
        };

        const onFinish = (values) => {
            console.log('Success:', values);
        };
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        const [loginUserName, setLoginUserName] = useState('');
        const [loginPassword, setLoginPassword] = useState('');

        const [registerUserName, setRegisterUserName] = useState('');
        const [registerPassword, setRegisterPassword] = useState('');
        const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
        
        
       

       

        const [open, setOpen] = useState(false);
        const { classes } = useStyles();

        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
        const handleFormSubmit = (values) => {
            if (loginUserName === '' || loginPassword === '') {
              Modal.warning({
                title: "Hata",
                content: "Kullanıcı adı ve şifre alanları boş bırakılamaz."
              });
            } else {
           
              setIsModalOpen(false)
            }
        }

        const handleRegisterFormSubmit = (values) => {
            if (registerUserName === '' || registerPassword === '' || registerConfirmPassword === '') {
              Modal.warning({
                title: "Hata",
                content: "Kullanıcı adı ve şifre alanları boş bırakılamaz."
              });
            } else {
         

                if (registerPassword !== registerConfirmPassword) {
                    Modal.warning({
                        title: "Hata",
                        content: "Girilen şifreler eşleşmiyor."
                    });
                }else {
                    Modal.warning({
                        title: "Başarılı",
                        content: "Kayıt Başarılı"
                    });
                    
                    setIsRegister(false)
                }
            }
        }

        return (
            <div className={classes.body}>
             
           
             <Button type="primary" onClick={showModal}>
         
      </Button>
       <Modal
        cancelButtonProps={{ style: { display: 'none' } }} 
        okText={isRegister ? "Kayıt Ol" : "Giriş Yap"}
        title={isRegister ? "Kayıt Ol" : "Giriş Yap"} open={isModalOpen} onOk={isRegister ? handleRegisterFormSubmit : handleFormSubmit}
        >
        {!isRegister ? <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Kullanıcı adı"
            name="loginUsername"
            onChange={(event) => {
                setLoginUserName(event.target.value);
            }}
            rules={[
                {
                required: true,
                message: 'Lütfen bir kullanıcı adı giriniz!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Şifre"
            name="loginPassword"
            onChange={(event) => {
                setLoginPassword(event.target.value);
            }}
            rules={[
                {
                required: true,
                message: 'Lütfen şifre giriniz!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>

           

            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button id="buttonRegisterForm" type="link" htmlType="button" onClick={showRegister}>
                Hesap oluştur
            </Button>
            </Form.Item>
        </Form> : <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Kullanıcı adı"
            name="registerUsername"
            onChange={(event) => {
                setRegisterUserName(event.target.value);
            }}
            rules={[
                {
                required: true,
                message: 'Lütfen kullanıcı adı giriniz!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Şifre"
            name="registerPassword"
            onChange={(event) => {
                setRegisterPassword(event.target.value);
            }}
            rules={[
                {
                required: true,
                message: 'Lütfen şifre giriniz!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>
            <Form.Item
            label="Şifre Tekrar"
            name="registerRepassword"
            onChange={(event) => {
                setRegisterConfirmPassword(event.target.value);
            }}
            rules={[
                {
                required: true,
                message: 'Şifreler aynı olmalıdır!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>

          
            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button id="buttonLoginForm" onClick={showRegister} type="primary" htmlType="submit">
                Giriş Yap
            </Button>
            </Form.Item>
        </Form>}
       </Modal>
                <CssBaseline />
                {!isModalOpen ? <Container maxWidth="lg">
                    <AppBar position="sticky" color="inherit" className={classes.header} elevation={0}>
                        <Toolbar>
                            <IconButton edge="start" className={classes.container} color="inherit" />
                            <Typography variant="h6" color="secondary" className={classes.title}>
                                <a href="https://acik-arttirma-client.onrender.com/">Açık Arttırma</a>
                            </Typography>
                            <Button color="primary" variant="outlined"
                                startIcon={<PenIcon />}
                                onClick={handleOpen}
                            >
                                Yeni ilan ekle
                            </Button>
                        </Toolbar>
                    </ AppBar>
                    <Grid container className={classes.container}>
                        <Grid item xs={12}>
                            <Router>
                                <Routes>
                                    <Route path="/" element={<PostsList />} />
                                    <Route path="/:id" element={<PostDetails />} />
                                </Routes>
                            </Router>
                        </Grid>
                    </Grid>
                </Container> : null}
                <AddPostForm open={open} handleClose={handleClose} />
            </div>
        );
    });

export default App;
