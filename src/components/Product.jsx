import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {add,remove} from '../redux/Slices/cartSlice'
const Product = ({post,cartItems,setCartItems,removeHandler,}) => {
  const {cart} = useSelector((state)=>state);
  const [selected,setSelected] = useState(false);
  const dispatch= useDispatch();
  // console.log(dispatch);
  console.log(cart);
  function addToCart(){
      dispatch(add(post));
  }

  function removeFromCaert(){
       dispatch(remove(post.id));
  }

 

  useEffect(()=>{
    const isPostInCart = cartItems.some((item) => item.id === post.id);

    if (isPostInCart) {
       setSelected(true);
    } else {
       setSelected(false);
    }
  },[])
  
 


   let title = post.title.length >14  ? (`${post.title.substring(0,16)}...`) : (post.title);
   let desc= post.description.length > 45 ? (`${post.description.substring(0,45)}...`) : (post.description)
  return (
    <div className=" max-w-[250px]   group-hover:bg-red-50  rounded-md flex flex-col gap-4 items-center px-8  shadow-xl   relative py-2  hover:scale-110  hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  ease-in transition-all duration-300 ">
 <div>
  <p className=" font-bold opacity-8 group">{title}</p>
 </div>

 <div>
  <p className="  text-xs opacity-55">{desc}</p>
 </div>
 <div className="h-[180px] my-[20px] w-[250px]">
   <img src={post.image} className=" w-full h-full   object-contain mb-3"></img>
 </div>
 <div>
   <p className=" absolute bottom-2 left-4 text-green-600 font-bold" >${post.price}</p>
 </div>
 <button className=" group-hover:bg-green-700 " onClick={ ()=> {setSelected((prev)=> !prev)
 
      if(selected == false)
      {
        addToCart();
       toast.success("Item Added To Cart")
        

      //  This if condition is wrong write cartItems.some here
       if(!cartItems.includes(post.id))
       {
        //  setCartItems(cartItems.push(post));
         setCartItems(prev => [...prev, post]);
        
       }

       }
      else{
        // removeFromCaert();
        toast.error(" Item Removed  from Cart ")
             removeFromCaert();
           removeHandler(post.id);
        
      }

 }}>
   {
    selected ? <p className=" absolute bottom-2 right-4 border-[1px] border-black px-3 py-1 rounded-2xl text-sm font-semibold ">Remove Item</p> : <p className=" absolute bottom-2 right-4 border-[1px] border-black px-3 py-1 rounded-2xl text-sm font-semibold ">Add To Card</p>
   }
 </button>
    </div>
  );
};

export default Product;
