import React, {useEffect, useState} from 'react';
import {Container, FormCheck} from "react-bootstrap";
import {useUser} from "../UserProvider/UserProvider";
import ImageUploader from "../services/ImageUploader";
import CurrencyInput from "react-currency-input-field";
import {
    MDBInput,
    MDBTable,
    MDBTableBody,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTextArea,
    MDBTypography
} from "mdb-react-ui-kit";
import ajax from "../services/fetchServise";

const NewAdvertView = () => {
    const user = useUser();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const prefix = "₽ ";
    const [subCategory, setSubCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState(null);

    const [item, setItem] = useState({kindOfStand: "", another: "another"});
    const {kindOfStand} = item;

    const handlePriceChange = (e) => {
        e.preventDefault();
        const { value = "" } = e.target;
        const parsedValue = value.replace(/[^\d.]/gi, "");
        setPrice(parsedValue);
    };

    const handleOnBlur = () => setPrice(Number(price).toFixed(2));

    const handleChange = e => {
        e.persist();
        setItem(prevState => ({...prevState, kindOfStand: e.target.value}));
        setSubCategoryId(e.target.value);
    };

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
                <MDBTypography tag='div' className='display-3 pb-3 mb-3' style={{marginLeft: "40%"}}>
                    Add new advert
                </MDBTypography>

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

                <CurrencyInput
                    prefix={prefix}
                    name="currencyInput"
                    id="currencyInput"
                    data-number-to-fixed="2"
                    data-number-stepfactor="100"
                    value={price}
                    placeholder=""
                    onChange={handlePriceChange}
                    onBlur={handleOnBlur}
                    allowDecimals
                    decimalsLimit="2"
                    disableAbbreviations
                />

                <ImageUploader
                    title={title}
                    description={description}
                    subCategoryId={subCategoryId}
                    price={price}/>
            </Container>
        </div>
    );
};

export default NewAdvertView;