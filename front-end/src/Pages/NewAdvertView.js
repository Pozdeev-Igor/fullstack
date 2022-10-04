import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useUser} from "../UserProvider/UserProvider";
import ImageUploader from "../services/ImageUploader";
import {
    MDBBtn,
    MDBCheckbox, MDBCollapse,
    MDBInput, MDBRadio,
    MDBTable,
    MDBTableBody,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane,
    MDBTextArea
} from "mdb-react-ui-kit";
import ajax from "../services/fetchServise";

const NewAdvertView = () => {
    const user = useUser();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subCategory, setSubCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [values, setValues] = useState([]);

    const [showShow, setShowShow] = useState(false);

    function toggleShow() {


        setShowShow(!showShow);
    }


    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value: String) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
        setValues(category.map((cat) => cat.id))


        ajax(`/api/admin/categories/${value}`, "GET", user.jwt).then((response) => {
                let subcategoryData = response;
                setSubCategory(subcategoryData);
            }
        );
    };

    useEffect(() => {
        ajax(`/api/admin/categories`, "GET", user.jwt).then((response) => {
                setCategory(response);
            }
        );
    }, [category]);


    return (
        <div className="w-75">
            <Container className="justify-content-lg-center">
                <h1 style={{textAlign: "center"}}>Add new advert</h1>

                <>
                    <MDBTabs pills className='mb-3'>
                        {category.map((cat) => (
                            <MDBTabsItem key={cat.id}>
                                <MDBTabsLink onClick={() => handleBasicClick(`${cat.id}`)}
                                             active={basicActive === `${cat.id}`}>
                                    {cat.name}
                                </MDBTabsLink>
                            </MDBTabsItem>
                        ))}
                    </MDBTabs>
                    <MDBTabsContent>
                        <MDBTable>
                            {subCategory.map((sub) => (
                                <MDBTableBody key={sub.id}>

                                    <td>
                                        <MDBRadio
                                            name='flexRadioDefault'
                                            value=''
                                            id='flexRadioDefault1'
                                            label={`${sub.name}`}/>
                                    </td>

                                </MDBTableBody>
                            ))}
                        </MDBTable>
                        <MDBTabsPane show={basicActive === 'tab2'}>Tab 2 content</MDBTabsPane>
                        <MDBTabsPane show={basicActive === 'tab3'}>Tab 3 content</MDBTabsPane>
                    </MDBTabsContent>
                </>

                <MDBInput
                    label='Заголовок объявления'
                    id='formControlLg'
                    type='text'
                    size='lg'
                    onChange={(e) => setTitle(e.target.value)}/>

                <MDBTextArea
                    label='Описание'
                    id='textAreaExample'
                    rows={4}
                    style={{marginTop: "30px", marginBottom: "30px"}}
                    onChange={(e) => setDescription(e.target.value)}/>
                    <MDBBtn className="btn-lg" style={{marginBottom:"30px", marginLeft:"40%"}} onClick={toggleShow}>Continue</MDBBtn>
                    <MDBCollapse show={showShow}>
                        <ImageUploader title={title} description={description}/>
                    </MDBCollapse>
            </Container>
        </div>
    );
};

export default NewAdvertView;