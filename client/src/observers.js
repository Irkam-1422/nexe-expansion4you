//import animStyles from '../styles/Animation.module.css'
 
let options = { threshold: [0.5] };

// const onEntryLeft = (entry) => {
//     entry.forEach(change => {  
//       if (change.isIntersecting) {
//         change.target.classList.remove(`${clas}`)
//       } else {
//         change.target.classList.add(`${clas}`) 
//       }
//     });
//   }

// const onEntryOp = (entry) => {
//     entry.forEach(change => {  
//         if (change.isIntersecting) {
//         change.target.classList.remove(`${animStyles.hiddenOp}`)
//         } else {
//         change.target.classList.add(`${animStyles.hiddenOp}`)
//         }
//     });
// }

// const onEntryRight = (entry) => {
//     entry.forEach(change => {  
//       if (change.isIntersecting) {
//         change.target.classList.remove(`${animStyles.hiddenRight}`)
//       } else {
//         change.target.classList.add(`${animStyles.hiddenRight}`)
//       }
//     });
// }

const observer = (clas) => {
  return new IntersectionObserver((entry) => {
      entry.forEach(change => {  
        if (change.isIntersecting) {
          change.target.classList.remove(`${clas}`)
        } else {
          change.target.classList.add(`${clas}`) 
        }
      });
  }, options);
} 

const observer2 = (clas) => {
  return new IntersectionObserver((entry) => {
      entry.forEach(change => {  
        if (change.isIntersecting) {
          change.target.classList.add(`${clas}`)
        } else {
          change.target.classList.remove(`${clas}`) 
        }
      });
  }, options);
} 

// const bottomObserver = (clas, [elements]) => {
//   return new IntersectionObserver((entry) => {
//     entry.forEach(change => {  
//       if (change.isIntersecting) {
//         for (let elm of elements) {
//           elm.classList.remove(`${clas}`)
//         }
//       } else {
//         for (let elm of elements) {
//           elm.classList.remove(`${clas}`)
//         }
//       }
//     });
// }, options);
// }
// const observerOp = new IntersectionObserver(() => onEntryOp(clas), options);
// const observerRight = new IntersectionObserver(() => onEntryRight(clas), options);

module.exports = { 
  observer, 
  observer2
  //bottomObserver
  // observerOp,
  // observerRight
}