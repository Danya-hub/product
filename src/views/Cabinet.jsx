import React, {
    Fragment, useState, useContext, useEffect, useCallback,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import { Context } from "../index.js";
import { getValData, setValData } from "../firebase/database.js";

import Popup from "../components/UI/AppPopup.jsx";
import Select from "../components/UI/InputSelect.jsx";
import File from "../components/UI/InputFile.jsx";
import Loader from "../components/UI/StaticLoader.jsx";
import Avatar from "../components/UI/ClientAvatar.jsx";

import category from "../content/category.js";
import currency from "../content/currency.js";

import "../styles/sections/Cabinet.css";
import { MAX_COUNT_STARS, MAIN_DATA_USER_KEY, ADDIT_DATA_USER_KEY } from "../global.js";
import { useTranslation } from "react-i18next";

function Cabinet() {
    const createNewProduct = useCallback((uid) => {
        return {
            uid,
            category: "",
            name: "",
            descr: "",
            price: 0,
            currency: "",
            photoURL: "",
            createAt: () => new Date().toLocaleDateString(),
            author: (user) => user.displayName + ", " + user.email,
            discount: 0,
        };
    }, []);

    const { t } = useTranslation();
    const [user] = useAuthState(useContext(Context).auth);
    
    const [isEdit, setEdit] = useState(false);
    const [isLoaded, setLoad] = useState({
        avatar: true,
        prodImage: true,
    });
    const [isVisPopupProd, setVisPopupProd] = useState(false);
    const [productTempl, setProductTempl] = useState(createNewProduct(user.uid));
    
    const [countProd, setCountProd] = useState(0);
    
    const [newProducts, setNewProducts] = useState({});
    const [updatedUser, updateUser] = useState({}); 
    
    useEffect(() => {
        getValData("users").then((val) => {
            if (val && val[user.uid]) {
                updateUser(val[user.uid]);
            }
        });
    }, [user.uid]);

    useEffect(() => {
        getValData("products").then((val) => {
            if (val && val[user.uid]) {
                setNewProducts(val[user.uid]);
                setCountProd(Object.keys(newProducts).length);
            }
        });
    }, [newProducts, user.uid]);
    
    const changeVal = useCallback((e, callback) => {
        callback((prev) => ({
            ...prev,
            [e.target.parentNode.getAttribute("name") || e.target.getAttribute("name")]: e.target.value || e.target.getAttribute("value"),
        }))
    }, [])

    const distrUserData = useCallback((key) => {
        if (!updatedUser[key]) return;
        
        if (MAIN_DATA_USER_KEY.includes(key))
            updateProfile(user, { [key]: updatedUser[key] });
        else setValData(`users/${user.uid}`, { [key]: updatedUser[key] });
    }, [updatedUser, user])

    return (
        <Fragment>
            { isVisPopupProd && <Popup className="newProd" styles={{
                position: "fixed",
                background: "rgb(var(--white))",
                boxShadow: "0 0 10px rgba(var(--lightBlack), 0.2), inset 0 0 0 0.6px rgb(var(--brown))",
                transform: "translate(-50%, -50%)",
                borderRadius: "var(--r-def)",
                maxWidth: "600px",
                maxHeight: "100%",
                overflowY: "scroll",
                width: "100%",
                left: "50%",
                top: "50%",
                padding: "20px",
                zIndex: 2,
            }} close={setVisPopupProd} hasCloseBtn>
                <h2 className="title">{ t("newProdTitle") }</h2>
                { !isLoaded.prodImage && <div className="backLoader">
                    <Loader styles={{
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                        left: "50%",
                        top: "50%",
                    }}></Loader>
                </div> }
                { <form onSubmit={(e) => {
                    setValData(`products/${user.uid}/${countProd}`, productTempl, e);
                    setVisPopupProd(false);
    
                    window.location.reload();
                }}>
                    <label id="category">
                        <b>{ t("categoryTitle") }:</b>
                        <Select className={ `input ${!productTempl.category ? "noChange" : ""}` }
                            nameOption="category"
                            content={category.map(obj => ({text: t(obj.title), value: obj.name}))} callback={(e) => changeVal(e, setProductTempl)} 
                            required>
                        </Select>
                    </label>
                    <label id="name">
                        <b>{ t("nameProdTitle") }</b>
                        <input className={ `input ${!productTempl.name ? "noChange" : ""}` } type="text" name="name" onChange={(e) => changeVal(e, setProductTempl)} required />
                    </label>
                    <label id="descr">
                        <b>{ t("descrProdTitle") }</b>
                        <textarea className={ `input ${!productTempl.descr ? "noChange" : ""}` } name="descr" onChange={(e) => changeVal(e, setProductTempl)} required></textarea>
                    </label>
                    <label id="price">
                        <b>{ t("priceProdTitle") }</b>
                        <div>
                            <input className={ `input ${!productTempl.price ? "noChange" : ""}` } type="text" name="price" onChange={(e) => changeVal(e, setProductTempl)} required />
                            <Select  className={ `input ${!productTempl.currency ? "noChange" : ""}` }
                                nameOption="currency"
                                content={currency} callback={(e) => changeVal(e, setProductTempl)} 
                                required>
                            </Select>
                        </div>
                    </label>
                    <label id="discount">
                        <b>{ t("discountProdTitle") }</b>
                        <input className={ `input ${!productTempl.discount ? "noChange" : ""}` } type="text" name="discount" onChange={(e) => changeVal(e, setProductTempl)} required />
                    </label>
                    <label id="image">
                        <span>{ t("photoProdTitle") }:</span>
                        <File className={`input ${!productTempl.photoURL ? "noChange" : ""}`} onChange={(promise) => {
                                setLoad({ prodImage: false });
                                promise.then((res) => {
                                    setProductTempl((prev) => ({...prev, photoURL: res}));
                                    setLoad({ prodImage: true });
                                });
                            }} name="imageProd" accept=".jpg,.jpeg,.png">
                            <span>{ t("chooseBtn") }</span>
                        </File>
                    </label>
                    <button>{ t("addBtn") }</button>
                </form>}
            </Popup> }
            <section id="aboutUser">
                <form onSubmit={(e) => {
                        e.preventDefault();

                        if (isEdit || !isLoaded.avatar) return;
                        MAIN_DATA_USER_KEY.concat(ADDIT_DATA_USER_KEY).forEach(key => distrUserData(key));
                        window.location.reload();
                    }}>
                    <div id="avatar">
                        { isLoaded.avatar ? 
                            <Avatar className={`image ${isEdit ? "change" : ""}`} user={{
                                name: user.displayName,
                                photoURL: user.photoURL,
                            }} changeImage={isEdit}
                            callback={(promise) => {
                                setLoad({ avatar: false });
                                promise
                                    .then((res) => {
                                        updateUser((prev) => ({ ...prev, photoURL: res }));
                                        setLoad({ avatar: true });
                                    })
                            }} ></Avatar>
                        : <Loader className="image" styles={{
                            background: "rgb(var(--lightGray))",
                        }}></Loader>}
                        <div id="status">
                            <span>{ t("statusTitle") }:</span>
                            <div id="stars"></div>
                        </div>
                    </div>
                    <div className="content">
                        <label id="name">
                            <span>{ t("nameUserTitle") }:</span>
                            <input type="text" name="displayName" placeholder={user.displayName} onChange={
                                (e) => changeVal(e, updateUser)
                            } disabled={!isEdit} />
                        </label>
                        <span>{ t("emailUserTitle") }: {user.email}</span>
                        <span>{ t("countProdUserTitle") }: {countProd}</span>
                        { (updatedUser.about || isEdit) && <label id="about">
                            <span>{ t("aboutUserTitle") }:</span>
                            <input type="text" name="about" placeholder={updatedUser.about} onChange={
                                (e) => changeVal(e, updateUser)
                            } disabled={!isEdit} />
                        </label> }
                        <div className="buttons">
                            <button id="edit" onClick={() => setEdit(!isEdit)}>
                                { t(!isEdit ? "editProdUserBtn" : "changeBtn") }
                            </button>
                            { isEdit && <button id="cancel" onClick={() => {
                                window.location.reload();
                            }}>{ t("cancelBtn") }</button> }
                        </div>
                    </div>
                </form>
                <div>
                    <p id="userId">UserId: {user.uid}</p>
                    <p id="dateCreated">{ t("dateSignupUser") }: { new Date(user.metadata.creationTime).toLocaleDateString() }</p>
                </div>
            </section>
            <section id="myProducts">
                <h2 className="title">{ t("myProductsTitle") }</h2>
                <div className="wrapper">
                    { Object.values(newProducts).map((obj, i) => <div className="card" key={`${obj.name}/${obj.uid}/${i}`}>
                        <img src={ obj.photoURL } alt="product" />
                        <div className="text">
                            <h3>{ obj.name }</h3>
                            <div id="price">
                                <span>{ obj.price }{obj.currency}</span>
                                { obj.discount && <span>{ obj.discount }</span> }
                            </div>
                            <p>{ obj.descr }</p>
                        </div>
                    </div>) }
                    <button id="newCardProd" className="card" onClick={() => setVisPopupProd(true)}>
                        <img src={ require("../assets/image/plus.png") } alt="plus" />
                        <span>{ t("newProdTitle") }</span>
                    </button>
                </div>
            </section>
        </Fragment>
    )
}

export { Cabinet as default };