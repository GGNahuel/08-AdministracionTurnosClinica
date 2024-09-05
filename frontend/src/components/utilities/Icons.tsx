export function ConfigIcon ({color = "#000000"} : {color?: string}) {
  return (
    <svg className="icon" width="800px" height="800px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" d="M14 20C17.3137 20 20 17.3137 20 14C20 10.6863 17.3137 8 14 8C10.6863 8 8 10.6863 8 14C8 17.3137 10.6863 20 14 20ZM18 14C18 16.2091 16.2091 18 14 18C11.7909 18 10 16.2091 10 14C10 11.7909 11.7909 10 14 10C16.2091 10 18 11.7909 18 14Z" 
        fill={color} fill-rule="evenodd"/>
      <path clip-rule="evenodd" d="M0 12.9996V14.9996C0 16.5478 1.17261 17.822 2.67809 17.9826C2.80588 18.3459 2.95062 18.7011 3.11133 19.0473C2.12484 20.226 2.18536 21.984 3.29291 23.0916L4.70712 24.5058C5.78946 25.5881 7.49305 25.6706 8.67003 24.7531C9.1044 24.9688 9.55383 25.159 10.0163 25.3218C10.1769 26.8273 11.4511 28 12.9993 28H14.9993C16.5471 28 17.8211 26.8279 17.9821 25.3228C18.4024 25.175 18.8119 25.0046 19.2091 24.8129C20.3823 25.6664 22.0344 25.564 23.0926 24.5058L24.5068 23.0916C25.565 22.0334 25.6674 20.3813 24.814 19.2081C25.0054 18.8113 25.1757 18.4023 25.3234 17.9824C26.8282 17.8211 28 16.5472 28 14.9996V12.9996C28 11.452 26.8282 10.1782 25.3234 10.0169C25.1605 9.55375 24.9701 9.10374 24.7541 8.66883C25.6708 7.49189 25.5882 5.78888 24.5061 4.70681L23.0919 3.29259C21.9846 2.18531 20.2271 2.12455 19.0485 3.1103C18.7017 2.94935 18.3459 2.80441 17.982 2.67647C17.8207 1.17177 16.5468 0 14.9993 0H12.9993C11.4514 0 10.1773 1.17231 10.0164 2.6775C9.60779 2.8213 9.20936 2.98653 8.82251 3.17181C7.64444 2.12251 5.83764 2.16276 4.70782 3.29259L3.2936 4.7068C2.16377 5.83664 2.12352 7.64345 3.17285 8.82152C2.98737 9.20877 2.82199 9.60763 2.67809 10.0167C1.17261 10.1773 0 11.4515 0 12.9996ZM15.9993 3C15.9993 2.44772 15.5516 2 14.9993 2H12.9993C12.447 2 11.9993 2.44772 11.9993 3V3.38269C11.9993 3.85823 11.6626 4.26276 11.2059 4.39542C10.4966 4.60148 9.81974 4.88401 9.18495 5.23348C8.76836 5.46282 8.24425 5.41481 7.90799 5.07855L7.53624 4.70681C7.14572 4.31628 6.51256 4.31628 6.12203 4.7068L4.70782 6.12102C4.31729 6.51154 4.31729 7.14471 4.70782 7.53523L5.07958 7.90699C5.41584 8.24325 5.46385 8.76736 5.23451 9.18395C4.88485 9.8191 4.6022 10.4963 4.39611 11.2061C4.2635 11.6629 3.85894 11.9996 3.38334 11.9996H3C2.44772 11.9996 2 12.4474 2 12.9996V14.9996C2 15.5519 2.44772 15.9996 3 15.9996H3.38334C3.85894 15.9996 4.26349 16.3364 4.39611 16.7931C4.58954 17.4594 4.85042 18.0969 5.17085 18.6979C5.39202 19.1127 5.34095 19.6293 5.00855 19.9617L4.70712 20.2632C4.3166 20.6537 4.3166 21.2868 4.70712 21.6774L6.12134 23.0916C6.51186 23.4821 7.14503 23.4821 7.53555 23.0916L7.77887 22.8483C8.11899 22.5081 8.65055 22.4633 9.06879 22.7008C9.73695 23.0804 10.4531 23.3852 11.2059 23.6039C11.6626 23.7365 11.9993 24.1411 11.9993 24.6166V25C11.9993 25.5523 12.447 26 12.9993 26H14.9993C15.5516 26 15.9993 25.5523 15.9993 25V24.6174C15.9993 24.1418 16.3361 23.7372 16.7929 23.6046C17.5032 23.3985 18.1809 23.1157 18.8164 22.7658C19.233 22.5365 19.7571 22.5845 20.0934 22.9208L20.2642 23.0916C20.6547 23.4821 21.2879 23.4821 21.6784 23.0916L23.0926 21.6774C23.4831 21.2868 23.4831 20.6537 23.0926 20.2632L22.9218 20.0924C22.5855 19.7561 22.5375 19.232 22.7669 18.8154C23.1166 18.1802 23.3992 17.503 23.6053 16.7931C23.7379 16.3364 24.1425 15.9996 24.6181 15.9996H25C25.5523 15.9996 26 15.5519 26 14.9996V12.9996C26 12.4474 25.5523 11.9996 25 11.9996H24.6181C24.1425 11.9996 23.7379 11.6629 23.6053 11.2061C23.3866 10.4529 23.0817 9.73627 22.7019 9.06773C22.4643 8.64949 22.5092 8.11793 22.8493 7.77781L23.0919 7.53523C23.4824 7.14471 23.4824 6.51154 23.0919 6.12102L21.6777 4.7068C21.2872 4.31628 20.654 4.31628 20.2635 4.7068L19.9628 5.00748C19.6304 5.33988 19.1137 5.39096 18.6989 5.16979C18.0976 4.84915 17.4596 4.58815 16.7929 4.39467C16.3361 4.2621 15.9993 3.85752 15.9993 3.38187V3Z" 
        fill={color} fill-rule="evenodd"/>
    </svg>
  )
}

export function LanguageIcon ({color = "#000000"} : {color?: string}) {
  return (
    <svg className="icon" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15 3C16.95 8.84 16.95 15.16 15 21" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export function LogInIcon ({color = "#000000"} : {color?: string}) {
  return (
    <svg className="icon" width="800px" height="800px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" id="Stock_cut" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <desc/>
      <g>
        <polyline fill="none" points="21,18 21,11    11,1 1,11 1,31 21,31 21,24  " stroke={color} stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
        <line fill="none" stroke={color} stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="32" x2="11" y1="21" y2="21"/>
        <polyline fill="none" points="17,27 11,21    17,15  " stroke={color} stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      </g>
    </svg>
  )
}

export function LogOutIcon ({color = "#000000"} : {color?: string}) {
  return (
    <svg className="icon" width="800px" height="800px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" id="Stock_cut" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <desc/>
      <g>
        <polyline fill="none" points="21,18 21,11    11,1 1,11 1,31 21,31 21,24  " stroke={color} stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
        <line fill="none" stroke={color} stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="10" x2="31" y1="21" y2="21"/>
        <polyline fill="none" points="25,15 31,21    25,27  " stroke={color} stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      </g>
    </svg>
  )
}

export function LoupeIcon ({color = "#000000"} : {color?: string}) {
  return (
    <svg className="icon" fill={color} height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" transform="matrix(-1, 0, 0, 1, 0, 0)">
      <g id="SVGRepo_bgCarrier" stroke-width="16"/>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
      <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M270.746,117.149c-20.516-20.514-47.79-31.812-76.802-31.811c-12.854,0-23.273,10.42-23.273,23.273 c0.002,12.854,10.42,23.273,23.274,23.273c16.578,0,32.163,6.454,43.886,18.178c11.723,11.723,18.178,27.308,18.178,43.885 c-0.002,12.853,10.418,23.274,23.271,23.274c0.002,0,0.002,0,0.002,0c12.851,0,23.271-10.418,23.273-23.271 C302.556,164.939,291.26,137.663,270.746,117.149z"/> </g> </g> <g> <g> <path d="M505.183,472.272L346.497,313.586c25.921-32.979,41.398-74.536,41.398-119.639C387.894,87.005,300.89,0,193.946,0 c-0.003,0,0,0-0.003,0C142.14,0,93.434,20.175,56.806,56.804C20.173,93.437,0,142.141,0,193.947 C0,300.89,87.004,387.894,193.946,387.894c45.103,0,86.661-15.476,119.639-41.396L472.27,505.184 c4.544,4.544,10.501,6.816,16.457,6.816c5.956,0,11.913-2.271,16.455-6.817C514.273,496.096,514.273,481.359,505.183,472.272z M193.946,341.349c-81.276,0-147.4-66.124-147.4-147.402c0-39.373,15.332-76.389,43.172-104.229 c27.84-27.842,64.855-43.172,104.228-43.172c81.279,0,147.403,66.124,147.403,147.402S275.225,341.349,193.946,341.349z"/> </g> </g> </g>
    </svg>
  )
}

export function PencilIcon ({color = "#000000"} : {color?: string}) {
  return (
    <svg className="icon" width="800px" height="800px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" fill="none">
      <path d="m104.175 90.97-4.252 38.384 38.383-4.252L247.923 15.427V2.497L226.78-18.646h-12.93zm98.164-96.96 31.671 31.67" className="cls-1" 
        style={{
          fill: "none", fillOpacity: 1, fillRule: "nonzero", stroke: color, strokeWidth: 12, strokeLinecap: "round", strokeLinejoin: "round",
          strokeDasharray: "none", strokeOpacity: 1
        }} 
        transform="translate(-77.923 40.646)"
      />
      <path d="m195.656 33.271-52.882 52.882" 
        style={{
          fill: "none", fillOpacity: 1, fillRule: "nonzero", stroke: color, strokeWidth: 12, strokeLinecap: "round", 
          strokeLinejoin: "round", strokeMiterlimit: 5, strokeDasharray: "none", strokeOpacity: 1
        }}
        transform="translate(-77.923 40.646)"
      />
    </svg>
  )
}

export function TrashCanIcon ({color = "#000000"} : {color?: string}) {
  return (
    <svg className="icon" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H20L18.4199 20.2209C18.3074 21.2337 17.4512 22 16.4321 22H7.56786C6.54876 22 5.69264 21.2337 5.5801 20.2209L4 6Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.34491 3.14716C7.67506 2.44685 8.37973 2 9.15396 2H14.846C15.6203 2 16.3249 2.44685 16.6551 3.14716L18 6H6L7.34491 3.14716Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 6H22" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 11V16" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 11V16" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}
