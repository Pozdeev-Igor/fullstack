import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useUser} from "../UserProvider/UserProvider";
import ImageUploader from "../services/ImageUploader";
import {
    MDBInput, MDBTable,
    MDBTableBody,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane,
    MDBTextArea
} from "mdb-react-ui-kit";
import ajax from "../services/fetchServise";
import SubcategoriesList from "./Components/SubcategoriesList";

const NewAdvertView = () => {
    const user = useUser();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subCategory, setSubCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [values, setValues] = useState([]);


    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value: String) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
        setValues(category.map((cat) => cat.id))
        console.log(value.toString());


    // console.log(category.map((cat) => cat.id))
            ajax(`/api/admin/categories/${value}`, "GET", user.jwt).then((response) => {
                    let subcategoryData = response;
                    setSubCategory(subcategoryData);
                console.log(subCategory)
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
                        {/*{category.map((cat) => (*/}

                        {/*<MDBTabsPane key={cat.id} show={basicActive === `${cat.id}`}>{cat.name}</MDBTabsPane>*/}
                        {/*))}*/}
                        <MDBTable>
                                {subCategory.map((sub) => (
                            <MDBTableBody  key={sub.id}>

                                    <td>{sub.name}</td>

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

                <ImageUploader title={title} description={description}/>
            </Container>
        </div>
    );
};

export default NewAdvertView;