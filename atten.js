var dbg=0;  
function dT(s, n) {
  if(dbg<1) return;
  if(n==1) document.getElementById("str1").innerHTML=s;
  if(n==2) document.getElementById("str2").innerHTML=s;
  if(n==3) document.getElementById("str3").innerHTML=s;
  if(n==4) document.getElementById("str4").innerHTML=s;
}

function selUpdate(nvis, ssn) {    // selection has changed
  var sel, s, v;
  dT("selUpdate(1)",2);
  sel=document.getElementById("antenna").value;   nvis.antenna=parseInt(sel);
  document.getElementById("antenna").fontsize=45;  

  sel=document.getElementById("antenna2").value;  nvis.antenna2=parseInt(sel);
  sel=document.getElementById("mode").value;      nvis.mode=parseInt(sel);
 
  sel=document.getElementById("slidLat").value;   nvis.lat=parseFloat(sel)-90;
  s="Latitude="+nvis.lat+"&deg"; if(nvis.lat<0) s=s+" S"; if(nvis.lat>0) s=s+" N";
  document.getElementById("slidV1").innerHTML=s;

  sel=document.getElementById("slidMonth").value; nvis.month=parseInt(sel);
  s="Month="+nvis.month;  document.getElementById("slidV2").innerHTML=s;

  sel=document.getElementById("slidYear").value; nvis.year=parseInt(sel);  // read year slider
  sel=document.getElementById("slidSSN").value;  nvis.ssn=parseInt(sel);   // read SSN slider
  if(ssn==0) {  // Year determines SSN
    year2ssn(nvis);  // calc SSN from year
    document.getElementById("slidSSN").value=nvis.ssn;    // set SSN slider
  }
  if(ssn==1) {  // SSN selected by slider, year determined from SSN
    ssn2year(nvis) ;       // calc year from SSN
    document.getElementById("slidYear").value=nvis.year;  // set year slider
  }
  s="Year="+nvis.year;  document.getElementById("slidV3").innerHTML=s;  // show year
  s="SSN="+nvis.ssn;  document.getElementById("slidV4").innerHTML=s;    // show SSN

  sel=document.getElementById("slidDist").value;  nvis.distance=parseFloat(sel);
  if(nvis.mode == 2) nvis.distance*=5; if(nvis.mode == 3) nvis.distance*=30;

  s="Distance="+nvis.distance+" km";  document.getElementById("slidV5").innerHTML=s;
  sel=document.getElementById("slidHF2").value;   nvis.hF2=parseFloat(sel);
  s="Height hF2="+nvis.hF2+" km";  document.getElementById("slidV6").innerHTML=s;
  sel=document.getElementById("slidPower").value; nvis.power=parseInt(sel);
  s="Power="+nvis.power+" dBm";  document.getElementById("slidV7").innerHTML=s;
  sel=document.getElementById("slidHant1").value; nvis.mast=parseFloat(sel);
  s="Mast Tx="+nvis.mast+" m";  document.getElementById("slidV8").innerHTML=s;
  sel=document.getElementById("slidHant2").value; nvis.mast2=parseFloat(sel);
  s="Mast Rx="+nvis.mast2+" m";  document.getElementById("slidV9").innerHTML=s;
  sel=document.getElementById("slidElMin").value; nvis.elevMin=parseInt(sel);
  s="Elev Min="+nvis.elevMin+ "&deg";  document.getElementById("slidV10").innerHTML=s;
  sel=document.getElementById("slidLocation").value; nvis.location=parseInt(sel);
  s="Ambient Noise="+nvis.location+" dB";  document.getElementById("slidV11").innerHTML=s;  
  sel=document.getElementById("slidStorm").value; nvis.storm=parseInt(sel);
  s="Static= "+nvis.storm;  document.getElementById("slidV12").innerHTML=s;  
  sel=document.getElementById("slidBw").value; sel*= 200; nvis.bw=parseInt(sel);
  s="BW= "+nvis.bw+" Hz";  document.getElementById("slidV13").innerHTML=s;  
  s="Screen= "+window.innerWidth+"x"+window.innerHeight;  document.getElementById("slidV14").innerHTML=s;  
 
  nvis.gain=3.0;    nvis.eirp = nvis.power+(nvis.gain*2);  
  console.log("selChange(11) "+nvis.lat+","+nvis.month+","+nvis.year);
  console.log("selChange(12) "+nvis.mast+","+nvis.antenna+","+nvis.power);
  console.log("selChange(13) "+nvis.distance+", "+ nvis.location+","+nvis.storm);
  console.log("selChange(14) elevMin=",nvis.elevMin);
  dT("selUpdate(4)", 2);
  nvisCheck(nvis);
  dT("selUpdate(7)", 2);
  canvasUpdate1(nvis);
  dT("selUpdate(9)", 2);
}

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
  Faa = 49-22*Math.log10(nvis.freq);        // man made + galactic noise at quiet location
  Faa += nvis.location;                     // added man made local noise
  if(Faa < 0.0) Faa=0.0;
  var Fac = 92-63*Math.log10(nvis.freq);    // atmospheric noise exceeded 0.5% of the time
  Fac *= nvis.storm / 20.0;                 // adjusted for "storminess"
  if(Fac < 0.0) Fac=0.0;
  console.log("calcNoise() fr="+nvis.freq+",loc="+nvis.location+
  ",sto="+nvis.storm+",Faa="+Faa+",Fac="+Fac);  
  if(Fac>Faa)   Faa=Fac;
  Faa -= 10*Math.log10(3000/nvis.bw);
  return Faa-147.0;                         // BW=3kHz, dBm value
}

function canvasUpdate1(nvis) {    // drawing on canvas
  var w1,w2,h1,h2;
  console.log("canvasUpdate1(1)"); 
  dT("canvasUpdate1(1)", 3);
  nvisCheck(nvis);
  w1 = window.innerWidth-10;                 w2 = parseInt(w1/10);
  h1 = parseInt(window.innerHeight*0.75);    h2 = parseInt(h1/40);
  var canvas = document.getElementById("myCanvas");  // find canvas element
  var ctx = canvas.getContext("2d");      // get drawing object
  ctx.clearRect(0, 0, w1, h1);
  ctx.fillStyle = "#FF0000";      // set fill style to red color
  ctx.font = "35px Arial";        // draw text
  var i, y=0, s, li, ld, n;
  nvisPredict(nvis); 
  s=showfoF2(nvis); 
  ctx.fillStyle= "blue"; ctx.fillText(s,1, y+=30);
  s=showMuf(nvis);  
  ctx.fillText(s,1, y+=30);
  s= "f       Eirp    Li       Ld      Lt        N      SnrM  SnrD SnrN"; ctx.fillText(s,1, y+=50);
  ctx.fillStyle= "black";
  nvis.freq=1.5;
  var mf=nvis.muf1*1.18;
  for ( i=0; i<25; i++) {
    dT("canvasUpdate(22) i="+i, 3);
      nvisCheck(nvis);
      y += 30;    
      nvis.freq += 0.5; 
      if(i>8) nvis.freq+=0.5;
      if(i>20) nvis.freq+=1;
      ctx.fillStyle="black";
      mf=nvis.muf3*1.18;
      if(nvis.freq > nvis.muf3) ctx.fillStyle="orange";
      if(nvis.freq > mf) ctx.fillStyle="red";
      s = nvis.freq.toFixed(1);  
      if(nvis.freq>9.5) s=Math.round(nvis.freq);
      ctx.fillText(s, 1, y);     // show frequency
      antennaGain(nvis);  
      nvis.eirp= nvis.power + nvis.gain; 
      s=Math.round(nvis.eirp);     ctx.fillText(s, 75, y); // show EIRP
      li= calcFSPL(nvis);       
      var li2 = 20* Math.log10(nvis.hops);
      li2 += 2*(nvis.hops-1);   
      li += li2;
      s=Math.round(li);     ctx.fillText(s, 175, y);  // show Li
      ld= calcDrap(nvis);  
      n = 2.2 / nvis.freq; 
      n = Math.pow(n, 1.9);  
      ld *= n;   ld *=nvis.hops;
      s=Math.round(ld);      ctx.fillText(s, 280, y); // show Ld
      s=Math.round(li+ld);   ctx.fillText(s, 370, y); // Show Lt
      n = calcNoise(nvis);   
      s=Math.round(n);     ctx.fillText(s, 460, y);
      s=Math.round(nvis.eirp+nvis.gain2-li-ld-n); // MidDay Snr
      ctx.fillText(s, 570, y);
      mf = nvis.muf3*1.01; // Day SNR
      if(nvis.freq > mf) ctx.fillStyle="red";
      s=Math.round(nvis.eirp+nvis.gain2-li-ld-n); 
      ctx.fillText(s, 680, y);  
      mf = nvis.muf1*1.18; // Night SNR
      if(nvis.freq > mf) ctx.fillStyle="red";
      s=Math.round(nvis.eirp+nvis.gain2-li-10-n); 
      ctx.fillText(s, 790, y);   
  }  
}


 

 