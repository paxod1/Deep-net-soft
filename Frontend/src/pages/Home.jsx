import React, { useEffect, useState } from 'react';
import '../styleSheets/Home.scss';
import { FaBars } from 'react-icons/fa';
import axios from 'axios'
import { GiRotaryPhone } from "react-icons/gi";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiFacebook } from "react-icons/fi";
import { CiTwitter } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

function Home() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [addMenuOpen, setAddMenuOpen] = useState(false)
    const [menuName, setMenuName] = useState('');
    const [heading, setHeading] = useState('');
    const [allMenuList, setAllMenuList] = useState([])
    const [menuButtonClicked, setMenuButtonClicked] = useState(null)
    const [addItemOpen, setAddItemOpen] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemDes, setItemDes] = useState('')
    const [itemPrice, setItemPrice] = useState()
    const [menuId, setMenuId] = useState()
    const [itemList, setItemList] = useState([])
    const [itemHeading, setItemHeading] = useState()

    useEffect(() => {
        getAllMenu()
    }, [addMenuOpen])

    async function getAllMenu() {
        var response = await axios.get('https://deep-net-soft.onrender.com/user/getallmenu')
        console.log(response.data);
        setAllMenuList(response.data)

        if (response.data) {
             getOneMenu(response.data[1]._id, response.data[1].heading)

        }
    }

    const handleSubmit = async () => {
        if (!menuName || !heading) {
            alert('Please fill in all fields!');
            return;
        }
        await axios.post('https://deep-net-soft.onrender.com/user/addmenu', { menuName, heading })
        alert('New menu added!');
        setMenuName('');
        setHeading('');
        setAddMenuOpen(false);
    };

    async function getOneMenu(id, heading) {
        setMenuButtonClicked(id)
        console.log(id);

        await setMenuId(id)
        await setItemHeading(heading)
        try {
            var response = await axios.get(`https://deep-net-soft.onrender.com/user/get-item-menu/${id}`)
            console.log(response.data);
            setItemList(response.data)

        } catch (error) {
            console.log(error);

        }
    }

    async function additems() {
        console.log(itemName, itemPrice, itemDes, menuId);

        if (!itemName || !itemPrice || !itemDes || !menuId) {
            alert('Please fill in all fields!');
            return;
        }
        await axios.post('https://deep-net-soft.onrender.com/user/additem', { itemName, itemPrice, itemDes, menuId })
        alert('New Item added!');
        setAddItemOpen(false)
        setItemDes('')
        setItemName('')
        setItemPrice('')
        getOneMenu(menuId)
    }

    return (
        <div>
            {/** Navbar section */}
            <section className='home_navbar_main'>
                <div className='home_navbar_inner_section'>
                    <div className='home_navbar_left'>
                        <div className='home_navbar_logo_side'>
                            <img
                                className="navbar_logo"
                                src="https://res.cloudinary.com/dqgrcovgg/image/upload/v1742977624/om0f5rtijft2cqr0g480-removebg-preview_ywdcuv.png"
                                alt="logo"
                                height={'50px'}
                                width={'50px'}
                            />
                            <div className="navbar_text">
                                <div className='navbar_log_firstline'>
                                    <div className="deep">DEEP</div> NET
                                </div>
                                <div className="soft">SOFT</div>
                            </div>
                        </div>
                    </div>
                    <div className='home_navbar_right'>
                        <h5>HOME</h5>
                        <h5 className="active">MENU</h5>
                        <h5>MAKE A RESERVATION</h5>
                        <h5>CONTACT US</h5>
                    </div>
                    <div className="menu_toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        <FaBars style={{ color: 'rgb(205, 205, 205)' }} />
                    </div>
                    {menuOpen && (
                        <div className="dropdown_menu">
                            <h5>HOME</h5>
                            <h5 className="active">MENU</h5>
                            <h5>MAKE A RESERVATION</h5>
                            <h5>CONTACT US</h5>
                        </div>
                    )}
                </div>
            </section>

            {/** Poster section */}

            <section className='home_poster_main_section'>
                <div className="home_poster_inner">
                    <h1 className='home_poster_heading'>MENU</h1>
                    <p className='home_poster_content'>
                        Please take a look at our menu featuring food, drinks, and brunch. If you'd like
                        to place an order, use the "Order Online" button located below the menu.
                    </p>
                </div>
            </section>

            {/** menu list section */}

            <section className='home_poster_menu_slect_section'>
                <div className='home_menu_inner_div'>
                    {
                        allMenuList.map((item) => (

                            <div className='home_menu_list_button_section'>
                                <button
                                    className={menuButtonClicked == item._id ? 'clicked_menu_button' : 'home_menu_button'}
                                    onClick={() => { getOneMenu(item._id, item.heading) }}
                                >
                                    {item.menuName}
                                </button>

                            </div>

                        ))
                    }

                    <button className='home_menu_add_button' onClick={() => setAddMenuOpen(!addMenuOpen)}>
                        Add Menu
                    </button>


                </div>

                {addMenuOpen && (
                    <div className='home_addmenu_form_main'>
                        <div className="close_botton_addmenu" onClick={() => setAddMenuOpen(false)}>✖</div>
                        <h2>Add New Menu</h2>
                        <input
                            type="text"
                            placeholder="Enter Menu Name"
                            value={menuName}
                            onChange={(e) => setMenuName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Heading"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                        />
                        <button onClick={handleSubmit}>Save Menu</button>
                    </div>
                )}
            </section>

            {/** items by clicked menu */}
            <section className='items_main_section'>
                <img
                    width={'7%'}
                    style={{ opacity: 0.5 }}
                    src="https://res.cloudinary.com/dqgrcovgg/image/upload/v1742993075/deep_net_menus1_mo5uxk.png"
                    alt="sideimage"
                    className='item_image_poster'
                />
                <div className='item_displaying_section'>

                    <img
                        src="https://png.pngtree.com/png-clipart/20221106/ourmid/pngtree-lemon-juice-png-image_6420322.png"
                        alt="lemonjuice"
                        className='item_showing_box_image1'
                        style={{ transform: 'rotateY(180deg)' }}
                    />


                    <div>
                        <div className='item_heaiding_main'>
                            <div className='line'></div>    <h1 className='item_heading'> {itemHeading} </h1> <div className='line'></div>
                        </div>

                        <div className='items_displaying_inner_box'>


                            {itemList.map((item) => (
                                <div className="item_onebyone" key={item._id}>
                                    <div className="item_details">
                                        <h2 className="item_name">{item.itemName} <span className="dotted_line"></span> <span className="item_price">${item.itemPrice}</span></h2>
                                        <p className="item_description">{item.itemDes}</p>
                                    </div>
                                </div>
                            ))}


                            <button className='item_showing_button_add_item' onClick={() => setAddItemOpen(true)} >Add Item</button>

                            {addItemOpen && (
                                <div className='home_addmenu_form_main'>
                                    <div className="close_botton_addmenu" onClick={() => setAddItemOpen(false)}>✖</div>
                                    <h2>Add New Item</h2>
                                    <input
                                        type="text"
                                        placeholder="Enter Item Name"
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter Item Description"
                                        value={itemDes}
                                        onChange={(e) => setItemDes(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter Item Price"
                                        value={itemPrice}
                                        onChange={(e) => setItemPrice(e.target.value)}
                                    />
                                    <button onClick={additems}>Save Menu</button>
                                </div>
                            )}

                        </div>
                    </div>
                    <img

                        src="https://res.cloudinary.com/dqgrcovgg/image/upload/v1742994334/image_deep_net_item_aeqfys.png"
                        alt=""
                        className='item_showing_box_image2'
                    />

                </div>
                <img

                    width={'7%'}
                    style={{ opacity: 0.5 }}
                    src="https://res.cloudinary.com/dqgrcovgg/image/upload/v1742993078/deep_net_menu2_uvdvdb.png"
                    alt="side image"
                    className='item_image_poster'
                />
            </section>

            <section className="contact_section_main">
                <div className="contact_section_inner_div">

                    <div className="contact_card_main">
                        <div className="contact_card_heading">CONNECT WITH US</div>
                        <div className="contact_icon">
                            <GiRotaryPhone style={{ color: 'rgb(243, 255, 69)', marginRight: '10px' }} />+91 9567843340
                        </div>
                        <div className="contact_details">
                            <MdOutlineMailOutline style={{ color: 'rgb(243, 255, 69)', marginRight: '10px' }} />info@deepnetsoft.com
                        </div>
                    </div>

                    <div className="contact_card_main">
                        <img
                            className="contact_logo"
                            src="https://res.cloudinary.com/dqgrcovgg/image/upload/v1742977624/om0f5rtijft2cqr0g480-removebg-preview_ywdcuv.png"
                            alt="logo"
                            height={'80px'}
                            width={'80px'}

                        />
                        <div className="conact_text">
                            <div className="deep">DEEP</div> NET
                            <div className="soft">SOFT</div>
                        </div>
                        <div className="contact_icon_middle_box">
                            <FiFacebook style={{ marginRight: '10px' }} />
                            <CiTwitter style={{ marginRight: '10px' }} />
                            <CiYoutube style={{ marginRight: '10px' }} />
                            <FaInstagram style={{ marginRight: '10px' }} />

                        </div>
                    </div>

                    <div className="contact_card_main">
                        <div className="contact_card_heading">FIND US</div>
                        <div className='contact_last_card'>
                            <div className="contact_iconlast_card-left">
                                <IoLocationOutline style={{ color: 'rgb(243, 255, 69)', margin: '10px' }} />
                            </div>
                            <div className="contact_details_last_card_right">First floor, Geo infopark,<br /> Infopark EXPY, Kakkanad</div>
                        </div>

                    </div>

                </div>
            </section>

            {/** footer section */}

            <section className='footer_main'>
                <div className='footer_inner_section'>
                    <div>
                        © 2024 Deepnetsoft Solutions. All rights reserved.
                    </div>
                    <div>
                        Terms & Conditions  &nbsp;&nbsp;&nbsp; Privacy Policy
                    </div>
                </div>
            </section>



        </div>
    );
}

export default Home;
