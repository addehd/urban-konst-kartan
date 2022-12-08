export default function Pin(){

 const bgColors = ["#4229DD","#DF67F3","#FF5C00","#20c416","#4229DD","#67D4F3","#4229DD"]

 function getRandomColor() {
  return bgColors[Math.floor(Math.random() * bgColors.length)];
 }
 
 return (
  <div>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	 viewBox="0 0 534.2 511.3" fill={getRandomColor()} width="3rem" xmlSpace="preserve">
      <g>
        <path  d="M533.4,511.2c-128.8-28-257.6-55.9-386.4-83.9c-0.2,0.3-0.3,0.7-0.5,1c1.8,1.3,3.5,2.6,5.4,3.9
          c5.1,3.6,5.3,4.2,2,9.6c-0.6,1-1,2-1.8,3.6c1.7,0.9,3.2,1.9,4.9,2.5c7.9,2.5,15.9,4.9,23.9,7.2c2.9,0.8,5.6,1.7,7-2.7
          c1-3.1,7.6-2.6,9,1.2c2.6,7.3,8.9,8.3,14.7,10.1c27.9,8.8,55.9,17.4,83.9,25.9c21.2,6.4,42.4,12.7,63.6,19c1.2,0.4,2.5,0.8,3.8,1.9
          c-1.2,0.1-2.3,0.3-3.5,0.3c-27,0.3-54,0.7-81,0.7c-3.8,0-7.9-1-11.4-2.6c-41.5-19.3-82.8-38.9-124.6-58.5c-1.3,1.5-2.4,3.2-3.9,4.4
          c-2.1,1.7-5,4.7-6.6,4.2c-4.4-1.4-8.4-4.3-12.4-6.9c-0.3-0.2,0.7-3.1,1.8-4.2c3.2-3.3,3.2-4.8-0.8-7.3c-5.9-3.7-9-3.6-14.9,2.4
          c-18.4,18.9-49.1,15.3-64.7,1.7c-21.1-18.5-25.4-58.7,9.1-79c5.3-3.1,17.2,1.2,19.4,6.9c0.6,1.6,0,4-0.8,5.6
          c-1.3,2.7-3.3,5-4.9,7.5c-2.9,4.7-2.1,6.5,3.1,6.7c9.8,0.3,18.5,4,26.9,8.4c6.5,3.4,6.3,4.4,1.8,9.9c-1.9,2.3-3.9,6.1-3.2,8.5
          c0.6,1.9,4.9,3.6,7.7,3.9c5.6,0.6,9.5,2.2,10.7,8.3c0.3,1.5,2.4,3.3,3.9,3.7c1.2,0.3,3.2-1,4.5-2c3-2.3,6-4.7,8.8-7.2
          c0.7-0.6,1-1.7,1.9-3.2c28.5,4.2,58.3,8.6,88,13.1c42.8,6.5,85.6,13,128.3,19.6c40.1,6.2,80.3,12.4,120.4,18.7
          c15,2.3,29.9,4.8,44.8,7.3c1.4,0.2,3.2,0.5,4.1,1.4c7.8,7.9,13.7,17,18.4,26.9C533.9,510.2,533.7,510.7,533.4,511.2z"/>
        <path class="st0" d="M51.2,337.9c-4.1,1.5-8.4,4.2-9.4,3.3c-2.5-2.3-3.6-6.2-5.2-9.5c-0.2-0.4-0.3-1-0.2-1.5
          c2.7-10.7-3.4-18.5-9-26.4c-8.6-12.1-17.1-24.2-25.9-36.2c-2-2.8-2.1-4.8-0.4-7.5c3-4.9,5.8-10,9.5-16.3
          c20.2,37.1,39.8,73,59.3,108.8c0.4-0.1,0.8-0.3,1.1-0.4c-1.8-7.8-3.6-15.6-5.5-23.4c-10-40.4-20.1-80.7-30-121.1
          c-0.6-2.4-0.1-5.6,1.1-7.9c2.6-5.2,6-10.1,9-15.1c0.7,0.2,1.5,0.3,2.2,0.5c7.6,46.5,15.1,93,22.9,140.7c7.4-7.6,14.5-5.9,22.4,0
          c0-4.2-0.1-7.1,0-9.9c0.1-3.8,0.4-7.7,0.7-11.5c0.2-3.3,1.7-7.2,0.4-9.7c-0.9-1.9-5.9-1.4-8.2-3.1c-4.6-3.4-9.1-7.2-12.5-11.7
          c-1.6-2.1-1.3-6.5-0.4-9.4c2.7-8.9,6-17.6,9.3-26.2c2-5.3,5.8-6.8,14.6-6.3c0.5-8.6,1.1-17.1,1.6-25.7c2.4-43.1,4.7-86.2,7.2-129.2
          c0.1-1.6,0.6-3.3,1.4-4.7C122.3,53.3,137.1,28,152,2.8c0.6-1.1,1.4-2.1,3-2.8c-1.8,10.6-3.6,21.1-5.5,31.7
          c-12.2,67.3-24.4,134.6-36.6,201.9c-7,38.3-14,76.6-20.9,114.9c-0.5,2.9-1.6,3.8-4.5,4c-7.5,0.4-9.4,2-11.7,9
          c-1.2,3.6-3.4,2.3-4.8,0.7c-4.6-5.2-9-10.7-13.4-16.1C55.3,343.1,53,340.2,51.2,337.9z"/>
        <path class="st0" d="M246.5,20.2c5.5,4.3,5.3,8.9,3.8,13.5c-5.5,16.6-11.2,33.1-16.8,49.6c-3.5,10.3-7.1,20.6-9.7,31.3
          c11.8-24.8,23.5-49.5,35.8-75.3C265,49,270.1,57.8,274.7,67c0.7,1.4-0.4,4.2-1.4,5.9c-13.6,24.4-27.4,48.7-41.1,73.1
          c-2.8,4.9-5.5,9.9-8.2,14.8c5.2,2.8,12.8,2,17.4-1.6c1.4-1.1,2.8-2.8,4.4-3.2c2.1-0.5,4.9-0.7,6.5,0.3c1.1,0.7,1.6,4,1,5.6
          c-1.9,5.3-3.9,10.7-7,15.3c-6.8,10.1-16.4,12.3-27.5,7.5c-7.7-3.3-6.5-4.8-11.2,3.7c-11.5,20.4-22.7,41.1-34,61.6
          c-0.9,1.7-1.7,3.5-1.8,6.3c2.9-1.3,5.7-3,8.7-3.8c2.5-0.6,5.3-0.1,7.9-0.1c-0.4,2.6,0,6-1.5,7.7c-3.8,4.3-8.4,7.9-13,11.9
          c-2.5-3.7-4.5-6.8-7.4-11.2c-14.4,24.9-28.2,48.7-42,72.5c0.5,0.4,1,0.9,1.5,1.3c3.4-1.7,6.9-3.4,10.6-5.2c0.6,1.8,1.1,3.3,1.7,5.1
          c2.8-1.5,5.3-3.1,8-4.3c1-0.5,2.9-0.6,3.6,0c0.8,0.7,1,2.4,0.8,3.6c-1,5.7-12.3,14.2-18.2,13.7c-0.7-0.1-1.3-0.2-1.9-0.4
          c-2.4-1-5.3-3.3-7.1-2.7c-3.4,1.2-6.2,4.1-9.2,6.4c-0.6,0.5-1,1.3-1.5,1.9c-0.4-0.2-0.8-0.3-1.2-0.5
          C156.5,241.8,201.4,131.2,246.5,20.2z"/>
        <path class="st0" d="M329.4,159.7c7.1,12,13.6,23,19.8,34.1c0.5,1-1,3.9-2.3,5c-12.6,10.7-25.3,21.1-38,31.7
          c-18.4,15.4-36.8,30.8-55.1,46.2c-3,2.6-5.8,5.5-8.6,8.1c2.2,7.1,2,6.9-5,8.3c-4.3,0.9-8.8,2.4-12.2,5
          c-17.7,13.6-35.1,27.5-52.5,41.5c-14.7,11.8-29.2,23.7-43.8,35.6c-0.3-0.3-0.6-0.6-0.9-0.9C196.7,303,262.6,231.8,329.4,159.7z"/>
        <path class="st0" d="M487,432.5c-106.8-10.7-213.6-21.3-320.4-32c0-0.4,0-0.8,0.1-1.3c9.8,0,19.6,0,29.3,0
          c89.8,0,179.6,0.1,269.4,0.1c3.2,0,5.1,0.8,6.7,3.7c5.2,9.4,10.7,18.6,16.1,28C487.8,431.5,487.4,432,487,432.5z"/>
        <path class="st0" d="M174,359.3c0.4,0.7,0.5,0.9,0.5,1c1.3,2.2,2.6,4.4,4,6.5c-3.5,2.1-7,5.9-10.4,5.8c-3.1-0.1-6.3-4.1-8.9-6.9
          c-0.4-0.4,1.8-4.7,3.5-5.5c30.7-14.2,57.2-35.2,85.2-53.6c38.7-25.6,77-51.9,115.5-77.9c1.3-0.9,2.8-1.7,5.4-3.3
          c4.2,8.4,8.4,16.5,12.1,24.7c0.4,0.9-1.6,3.6-3,4.4c-19.3,10.1-38.7,20.1-58.1,30c-47.1,24.1-94.2,48.2-141.2,72.3
          C177.1,357.5,175.7,358.4,174,359.3z"/>
        <path class="st0" d="M427.7,331.5c-75.1,12.5-150.3,25-225.4,37.6c-0.1-0.5-0.2-1-0.4-1.5c8.4-2.7,16.8-5.5,25.2-8
          c60.1-17.9,120.2-35.6,180.3-53.7c4.8-1.4,7.5-0.4,9.8,3.6c3.8,6.7,7.8,13.3,11.7,20C428.5,330.2,428.1,330.9,427.7,331.5z"/>
        <path class="st0" d="M170,296c43.5-61.1,87-122.2,131.2-184.4c5.4,8.8,10.1,16.3,15,24.3c-48.4,53.7-96.7,107.4-145,161.1
          C170.8,296.7,170.4,296.3,170,296z"/>
        <path class="st0" d="M245.7,385.8c20.3-2.1,40.7-4.3,61-6.3c34.3-3.5,68.5-7,102.8-10.4c10.9-1.1,21.9-1.9,32.8-3
          c5.8-0.6,10,1.2,12.5,6.7c1.7,3.7,3.9,7.3,6.6,12.1c-72.5,0.7-144.1,1.5-215.7,2.2C245.7,386.6,245.7,386.2,245.7,385.8z"/>
        <path class="st0" d="M167.6,140c4.2,1.7,8.1,2.8,11.5,4.8c1.1,0.6,1.8,3.6,1.2,5c-4.8,12.1-12.3,22.4-22.8,30.2
          c-1.6,1.2-4.9,0.6-7.2,0.1c-1.4-0.3-2.7-1.9-3.8-3c-6.3-6.2-6.4-8.2-0.5-14.8c5.6-6.3,11.3-12.6,17-18.8
          C164.3,142,166,141.1,167.6,140z"/>
        <path class="st0" d="M301.7,474.3c-2,0.4-4.1,1.1-6.1,1c-9.8-0.2-19.6-0.4-29.4-1.1c-7.6-0.5-14.5-3.6-20.3-8.5
          c-4.2-3.6-4-7,1.2-9.1c3.7-1.4,8.4-2.8,11.9-1.7c13.5,4.5,26.7,9.9,39.9,15.1c1.2,0.5,2.2,1.8,3.3,2.7
          C302,473.3,301.9,473.8,301.7,474.3z"/>
        <path class="st0" d="M103.7,403.2c-0.1-11.1,8.5-19.2,19-17.9c7,0.9,8.8,4,7.5,10.8c-1.8,9-5.6,15.4-15.7,16.4
          C107.2,413.3,103.8,410.6,103.7,403.2z"/>
        <path class="st0" d="M262,433.5c-5-1.3-10.1-2.3-15.1-3.9c-4-1.3-4.7-4.1-2.5-7.8c3.8-6.5,7.3-8.2,14.8-6.7
          c3.7,0.7,7.5,1.2,11.2,2.3c2.2,0.6,4.4,1.7,6.1,3.2c4.1,3.7,3.3,8.8-1.9,10.6C270.7,432.5,266.5,432.7,262,433.5z"/>
        <path class="st0" d="M272.9,332.9c-3.1-0.5-6.3-0.6-9.3-1.5c-1.1-0.3-2.7-2.8-2.3-3.6c4.5-11.1,14-18.8,27.2-12.9
          c2.5,1.1,5.2,4.7,5.4,7.3c0.2,2.2-2.8,5.7-5.2,6.8c-4.9,2.2-10.3,3.1-15.5,4.6C273.1,333.3,273,333.1,272.9,332.9z"/>
        <path class="st0" d="M91.9,368.9c3.1,0.4,7,0.8,11,1.5c3.8,0.6,4.6,2.7,2.6,6c-5.2,8.9-21,11.4-28.7,4.7c-4-3.5-2.9-8.2,2.4-10.5
          c0.9-0.4,1.9-0.7,2.9-0.8C85,369.4,88,369.2,91.9,368.9z"/>
        <path class="st0" d="M138.1,256.1c-2.8,5.1-5.2,10.5-8.7,15.2c-2.7,3.6-6.9,3.3-10.2,0.6c-3.7-3.1-3.1-6.5-0.5-9.6
          c3.5-4,7.2-7.8,11.1-11.3c1.1-1,3.8-1.3,5-0.7C136.3,251.2,136.7,253.5,138.1,256.1z"/>
        <path class="st0" d="M221.9,433.1c-2.7-0.6-4.2-0.5-5.3-1.2c-2-1.3-4.2-2.7-5.4-4.7c-0.4-0.6,2.3-3.1,3.7-4.7
          c0.5-0.6,1.3-1.1,1.9-1.6c2.2-1.4,4.6-4.8,7.2-1.8c2,2.4,3.6,6.2,3.3,9.2C227.2,430.3,223.4,431.9,221.9,433.1z"/>
        <path class="st0" d="M124.8,364.6c-5.3-1.2-8.4-3.5-8.1-6.8c0.3-3.8,3.2-4.7,6.4-4.8c4.2-0.2,9,3.5,7.9,6.3
          C129.9,361.5,126.9,362.8,124.8,364.6z"/>
        <path class="st0" d="M114.5,293.8c-0.1-5.4,3.3-10.7,7.3-11.4c1.4-0.3,3.6,0.1,4.4,1c0.7,0.9,0.7,3.3-0.1,4.4c-2,2.8-4.5,5.3-7,7.6
          c-0.8,0.7-2.5,1-3.5,0.7C114.9,295.9,114.7,294.2,114.5,293.8z"/>
        <path class="st0" d="M170.4,410.6c3.5,0,7-0.3,10.4,0.2c1,0.1,2.7,2.5,2.4,3.4c-0.4,1.2-2.5,2.9-3.5,2.7c-3.4-0.9-6.6-2.6-9.9-3.9
          C170.1,412.1,170.3,411.3,170.4,410.6z"/>
        <path class="st0" d="M38.8,367.8c-2.3-2.8-4.8-4.6-4.5-5.6c0.5-1.9,2.8-3.3,4.3-4.8c1.6,1.5,3.8,2.8,4.5,4.7
          C43.4,363,41,364.9,38.8,367.8z"/>
        <path class="st0" d="M54.6,355.3c-2.2,1.8-3.9,3.9-4.7,3.6c-1.4-0.5-2.3-2.5-3.5-3.8c1.2-0.8,2.3-2.2,3.5-2.3
          C51.1,352.8,52.4,354.1,54.6,355.3z"/>
      </g>
    </svg>
  </div>
 );
}