import React, {useEffect, useState} from 'react';
import {Container, FormCheck} from "react-bootstrap";
import {useUser} from "../UserProvider/UserProvider";
import ImageUploader from "../services/ImageUploader";
import {
    MDBBtn,
    MDBCollapse,
    MDBInput,
    MDBRadio,
    MDBTable,
    MDBTableBody,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink, MDBTabsPane,
    MDBTextArea
} from "mdb-react-ui-kit";
import ajax from "../services/fetchServise";

const NewAdvertView = () => {
    const user = useUser();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subCategory, setSubCategory] = useState([]);
    const [category, setCategory] = useState([]);
    // const [values, setValues] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState(null);

    const [showShow, setShowShow] = useState(false);

    const [item, setItem] = useState({ kindOfStand: "", another: "another" });
    const { kindOfStand } = item;
    const handleChange = e => {
        e.persist();
        setItem(prevState => ({...prevState, kindOfStand: e.target.value}));
        setSubCategoryId(e.target.value);
    };

    function toggleShow() {
        setShowShow(!showShow);
    }

    const [basicActive, setBasicActive] = useState('');

    const handleBasicClick = (value: any) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
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
    }, []);

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
                                    <tr>
                                        <td>
                                            <FormCheck
                                                type="radio"
                                                name='SubcategorySelection'
                                                id='flexRadioDefault1'
                                                label={`${sub.name}`}
                                                value={`${sub.id}`}
                                                onChange={handleChange}
                                                // checked={kindOfStand === `${sub.name[0]}`}
                                            />
                                        </td>
                                    </tr>
                                </MDBTableBody>
                            ))}
                        </MDBTable>
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
                <MDBBtn className="btn-lg" style={{marginBottom: "30px", marginLeft: "40%"}}
                        onClick={toggleShow}>Continue</MDBBtn>
                <MDBCollapse show={showShow}>
                    <ImageUploader title={title} description={description} subCategoryId={subCategoryId}/>
                </MDBCollapse>
            </Container>
        </div>
    );
};

export default NewAdvertView;