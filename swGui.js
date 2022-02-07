function selUpdate(nvis, ssn) {    // selection has changed
    var sel, s, v;
    sel=document.getElementById("antenna").value;   nvis.antenna=parseInt(sel);
    document.getElementById("antenna").fontsize=45;  
  
    sel=document.getElementById("antenna2").value;  nvis.antenna2=parseInt(sel);
    sel=document.getElementById("mode").value;      nvis.mode=parseInt(sel);
   
    sel=document.getElementById("slidLat").value;   nvis.lat=parseFloat(sel)-90;
    s="Lat="+nvis.lat+"&deg"; if(nvis.lat<0) s=s+" S"; if(nvis.lat>0) s=s+" N";
    document.getElementById("slidV1").innerHTML=s;
  
    sel=document.getElementById("slidMonth").value; nvis.month=parseInt(sel);
    s=month2str(nvis.month);  document.getElementById("slidV2").innerHTML=s;
  
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
  
    s="d="+nvis.distance+" km";  document.getElementById("slidV5").innerHTML=s;
    sel=document.getElementById("slidHF2").value;   nvis.hF2=parseFloat(sel);
    s="hF2="+nvis.hF2+" km";  document.getElementById("slidV6").innerHTML=s;
    sel=document.getElementById("slidPower").value; nvis.power=parseInt(sel);
    s="P="+nvis.power+" dBm";  document.getElementById("slidV7").innerHTML=s;
    sel=document.getElementById("slidHant1").value; nvis.mast=parseFloat(sel);
    s="hTx="+nvis.mast+" m";  document.getElementById("slidV8").innerHTML=s;
    sel=document.getElementById("slidHant2").value; nvis.mast2=parseFloat(sel);
    s="hRx="+nvis.mast2+" m";  document.getElementById("slidV9").innerHTML=s;
    sel=document.getElementById("slidElMin").value; nvis.elevMin=parseInt(sel);
    s="El>"+nvis.elevMin+ "&deg";  document.getElementById("slidV10").innerHTML=s;
    sel=document.getElementById("slidLocation").value; nvis.location=parseInt(sel);
    s="Na="+nvis.location+" dB";  document.getElementById("slidV11").innerHTML=s;  
    sel=document.getElementById("slidStorm").value; nvis.storm=parseInt(sel);
    s="Ns= "+nvis.storm;  document.getElementById("slidV12").innerHTML=s;  
    sel=document.getElementById("slidBw").value; sel*= 200; nvis.bw=parseInt(sel);
    s="BW="+nvis.bw+" Hz";  document.getElementById("slidV13").innerHTML=s;  
    s="Screen= "+window.innerWidth+"x"+window.innerHeight;  document.getElementById("slidV14").innerHTML=s;  
   
    nvis.gain=3.0;    nvis.eirp = nvis.power+(nvis.gain*2);  
    console.log("selChange(11) "+nvis.lat+","+nvis.month+","+nvis.year);
    console.log("selChange(12) "+nvis.mast+","+nvis.antenna+","+nvis.power);
    console.log("selChange(13) "+nvis.distance+", "+ nvis.location+","+nvis.storm);
    console.log("selChange(14) elevMin=",nvis.elevMin);
    nvisCheck(nvis);
    mufUpdate(nvis);
  }
   
  function mufUpdate(nvis) {    // FOT text update
    var co, over=0;
    var s, s2, s3;
    nvisCheck(nvis);
    nvisPredict(nvis); 
    s=showfoF2(nvis); document.getElementById("slidV15").innerHTML=s; 
    s=showMuf(nvis);  document.getElementById("slidV16").innerHTML=s; 
    s= "f    Eirp  Li   Ld   Lt    N      SnrM  SnrD  SnrN"; 
    document.getElementById("slidV17").innerHTML=s; 
  
    nvis.freq=1.5;
    var mf=nvis.muf1*1.18;
    for ( i=0; i<25; i++) {
        nvisCheck(nvis);   
        //if(i>8) nvis.freq+=0.5;
        //if(i>14) nvis.freq+=1;
        mf=nvis.muf3*1.18;
        co="black";
        if(nvis.freq > nvis.muf1) co="orange";
        if(nvis.freq > nvis.muf2) co="blue";
        if(nvis.freq > nvis.muf3) co="red";
        if(nvis.freq > mf) { co="lightgrey"; over++;}
        //if(over>2) i=23;
        s = nvis.freq.toPrecision(3);  
        antennaGain(nvis);  
        nvis.eirp= nvis.power + nvis.gain; 
        s2=Math.round(nvis.eirp);   s+="  "+ s2 ; // show EIRP
        li= calcFSPL(nvis);       
        var li2 = 20* Math.log10(nvis.hops);
        li2 += 2*(nvis.hops-1);   
        li += li2;
        s2=Math.round(li);  
        if(s2>799)  s2=799; if(s2<100)  s+=" "; if(s2<10)  s+=" "; s+="  "+ s2 ; // Li
        ld= calcDrap(nvis);  
        n = 2.2 / nvis.freq; 
        n = Math.pow(n, 1.9);  
        ld *= n;   ld *=nvis.hops;
        s2=Math.round(ld);  
        if(s2>999)  s2=999; if(s2<100)  s+=" "; if(s2<10)  s+=" "; s+="  "+ s2 ; // Ld
        s2=Math.round(li+ld);   
        if(s2>999)  s2=999; if(s2<100)  s+=" "; if(s2<10)  s+=" "; s+="  "+ s2 ; // Lt
        n = calcNoise(nvis);   
        s2=Math.round(n); if(s2>-40)  s2=-40;   
        s3 = Math.abs(s2); if(s3<100)  s+=" "; if(s3<10)  s+=" "; s+="  "+ s2 ;  // N
        s2=Math.round(nvis.eirp+nvis.gain2-li-ld-n); // MidDay Snr
        if(s2>199)   s2=199;  if(s2<-199)  s2=-199;
        s3=Math.abs(s2);
        if(s3<100)  s+=" "; if(s3<10)  s+=" "; if(s2>-0.5) s+=" "; s+="     "+ s2 ;
        mf = nvis.muf3*1.01; // Day SNR
        s2=Math.round(nvis.eirp+nvis.gain2-li-ld-n); 
        if(s2>199)   s2=199;  if(s2<-199)  s2=-199;
        s3=Math.abs(s2);
        if(s3<100)  s+=" "; if(s3<10)  s+=" "; if(s2>-0.5) s+=" "; s+="  "+ s2 ; 
        mf = nvis.muf1*1.18; // Night SNR
        s2=Math.round(nvis.eirp+nvis.gain2-li-10-n);  
        if(s2>199)   s2=199;  if(s2<-199)  s2=-199;
        s3=Math.abs(s2);
        if(s3<100)  s+=" "; if(s3<10)  s+=" "; if(s2>-0.5) s+=" "; s+="  "+ s2 ;
        setFot(i+1, s, co);  
        nvis.freq *= 1.133; 
    }  
  }
  
    
  
  
  
   
  
   