function sunLat(nvis) {
  var co=0;
  mo = nvis.month;
  if(mo ==1) co=-16; if(mo ==2) co=-8;   if(mo ==3) co=0;
  if(mo ==4) co=8;   if(mo ==5) co=16;  if(mo ==6) co=23;
  if(mo ==7) co=16;  if(mo ==8) co=8;   if(mo ==9) co=0;
  if(mo ==10) co=-8;  if(mo ==11) co=-16;  if(mo ==12) co=-23;
  console.log("sunLat() mo=", mo+", co="+ co);
  return co;
}

function calcFSPL(nvis) {   // FSPL
  return (20 * Math.log10(nvis.pathdist * nvis.freq) + 32.44); 
}

function calcDrap(nvis) {    // predicting DRAP at 2.2 MHz
  var ls = sunLat(nvis) - nvis.lat; // sun angle from normal at noon
  var ld = Math.cos(ls*3.1414/180);  var ld2 =30 + 25*ld; 
  var a = nvis.pathdist / (2*nvis.hF2); 
  var ld3 = ld2*a;
  console.log("calcDrap(1) ls="+ls+ ", ld="+ld +", ld2="+ld2);
  console.log("calcDrap(2) a="+a+ ", ld3="+ld3);
  return ld3;
}

function calcNoise(nvis) {                  // HF Noise per ITU-R P.372
  var Faa, Fac;
  Faa = 45-21*Math.log10(nvis.freq/2.0);    // man made + galactic noise at quiet location
  Faa += nvis.location;                     // added man made local noise
  if(Faa < 0.0) Faa=0.0;
  var Fac = 85-67*Math.log10(nvis.freq/2);    // atmospheric noise exceeded 0.5% of the time
  Fac *= nvis.storm / 20.0;                 // adjusted for "storminess"
  if(Fac < 0.0) Fac=0.0;
  console.log("calcNoise() fr="+nvis.freq+",loc="+nvis.location+
  ",sto="+nvis.storm+",Faa="+Faa+",Fac="+Fac);  
  if(Fac>Faa)   Faa=Fac;
  Faa -= 10*Math.log10(3000/nvis.bw);
  return Faa-139.0;                         // BW=3kHz, dBm value
}

function setFot(n, s, co) {    // FOT text update
  var sel="fot"+n;
  var element = document.getElementById(sel);
  element.innerHTML=s;
  element.style.color=co; 
}

function month2str(n) {    // FOT text update
  if(n==1)  return "Jan";  if(n==2)  return "Feb";  if(n==3)  return "Mar";
  if(n==4)  return "Apr";  if(n==5)  return "May";  if(n==6)  return "Jun";
  if(n==7)  return "Jul";  if(n==8)  return "Aug";  if(n==9)  return "Sep";
  if(n==10) return "Oct";  if(n==11) return "Nov";  
  return "Dec"; 
}




 

 