/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


 const sections = document.querySelectorAll('section');

 const navList = document.querySelector('#navbar__list');

 const scrollTop = document.querySelector('aside div.scroll__Top');




//  for responsive navbar across all devices  
 const button = document.querySelector('.page__header .menu__icon');

  button.addEventListener('click' , (evt) => {
    evt.preventDefault();
    navListItems.forEach( item => { 

       item.classList.toggle('menu_open');    
    });
  } );



// Build menu 

let docFragment = document.createDocumentFragment();   

sections.forEach( el => {

   let listEl = document.createElement('li');
   listEl.setAttribute('data-link' , el.id);
   listEl.classList.add('menu__link');
   listEl.innerHTML = `${el.dataset.nav}`

   docFragment.appendChild(listEl);
  
 });

  navList.appendChild(docFragment);


// Scroll to section on link click

navList.addEventListener('click' , (evt) => {
  
  sections.forEach( el => { 
   if (el.id === evt.target.dataset.link) { 
     el.scrollIntoView({ behavior: "smooth" });
    }

   } );

} );


// Set sections as active
// detect if page section is in view port & add active class 
const opt = {
  root : null,
  rootMargin : '0px' ,
  threshold : .32 
}

const navListItems = document.querySelectorAll('#navbar__list li');


let observer = new IntersectionObserver( (pageSections) => {

  pageSections.forEach( section => {
   
    if (section.isIntersecting) {
     
      section.target.classList.add('your-active-class');
     
      navListItems.forEach( item => {
         if ( item.dataset.link === section.target.id ) { 
           item.classList.add('menu__scroll');
          } else {
           item.classList.remove('menu__scroll');
          }
      });
      
    } else {
      section.target.classList.remove('your-active-class');
      
    }
  });
   
} , opt );


sections.forEach( section => {

  observer. observe(section);
});



//  Scroll to top button 
scrollTop.addEventListener('click' , () => {
  sections[0].scrollIntoView({ behavior : 'smooth' });
});


// scroll to top button visible on page bottom  
 
document.addEventListener('scroll' , evt => {
  let docBody = evt.target.body;

  if ( docBody.scrollHeight - 200 <= docBody.scrollTop + window.innerHeight )  {
    scrollTop.classList.add('scroll__top_visible');
  } else {
    scrollTop.classList.remove('scroll__top_visible');
  }

});
