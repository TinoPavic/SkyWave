class myNvis {
    constructor(name, c) {
        this.id=name;       this.code=c;  // debug information
        this.year = 2020;   this.month = 11; 
        this.lat=-38;       this.lon=-144;   this.bw=3000.0; 
        this.month=11;      this.year=2020;  this.ssn=20;  
        this.distance=100;  this.gain=6;     this.gain2=6;    
        this.power=52;      this.eirp = 64;  
        this.location=0;    this.storm=0;      
        this.hF2 = 300.0;   this.elev=90;    this.elevMin=10;  this.hops=1;
        this.freq=2.2;      this.mast=12;       this.antenna=1;    //tx dipole at 12 m
        this.mast2=12;      this.antenna2=1;   this.mode=0; //rx dipole at 12 m
        this.cycleCoe=1.0;  this.seasonCoe=1.0; this.latCoe=1.0; // Correction factors 
        this.fc1=2.3;  this.fc2=4.0;  this.fc3=5.0;   // foF2 (night, day, noon)
        this.muf1=2.5; this.muf2=4.1; this.muf3=5.1;  // MUF (night, day, noon)
        this.slm=1.0;  this.pathdist=100.0;  this.B=0.2;// secant law multiplier
    }
}

function nvisInit(nvis) {
  var dt = new Date(); // Current date 
  nvis.year = dt.getFullYear();  nvis.month = dt.getMonth()+1; 
  nvis.lat=-38;       nvis.lon=-144;    nvis.bw=3000;
  nvis.month=11;      nvis.year=2020;   nvis.ssn=20;
  nvis.distance=100;  nvis.gain=6;    nvis.power=52; nvis.hops=1; 
  nvis.location=0;    nvis.storm=0;    nvis.eirp = 64;  
  nvis.hF2 = 300.0;   nvis.elev=90;    nvis.elevMin=10; nvis.freq=2.2;
  nvis.mast=12;       nvis.antenna=1;     //dipole at 12 m
  nvis.mast2=12;      nvis.antenna2=1;    //dipole at 12 m
  nvis.mode=0; // NVIS mode
  nvis.cycleCoe=1.0;  nvis.seasonCoe=1.0; nvis.latCoe=1.0; // Correction factors 
  nvis.fc1=2.3;  nvis.fc2=4.0;  nvis.fc3=5.0;   // foF2 (night, day, noon)
  nvis.muf1=2.5; nvis.muf2=4.1; nvis.muf3=5.1;    // MUF (night, day, noon)
  nvis.slm=1.0;  nvis.pathdist=100.0;  nvis.B=0.2; // secant law multiplier
  console.log("nvisInit(10) id="+nvis.id+",code="+nvis.code);
  nvisCheck(nvis);
  return nvis;
}

function D2R (n) { var n2 = Math.PI / 180; return n*n2;}
function R2D (n) { var n2 = Math.PI / 180; return n/n2;}

function nvisCheck(nvis) {
  var s="nvisCheck(): id="+nvis.id+", code="+nvis.code;
  if(nvis.id == "Nvis") { console.log(s+" OK!"); return 1;}
  console.log(s+ "  Error !!! Warning !"); return 0;
}

function calcMuf(nvis) {   // Maximum Usable Frequencies (MUF)
  var c = nvis.fc2;
  var fh=0.6;
  if(nvis.distance>150)   fh= 0.45;
  if(nvis.distance>600)   fh= 0.32;
  if(nvis.distance>1200)  fh= 0.23;
  if(nvis.distance>2500)  fh= 0.15;
  nvis.muf1 = nvis.fc1 + fh;  nvis.muf1 *= 0.9 * nvis.slm;
  nvis.muf2 = nvis.fc2 + fh;  nvis.muf2 *= 0.9 * nvis.slm;
  nvis.muf3 = nvis.fc3 + fh;  nvis.muf3 *= 0.9 * nvis.slm;
}
function year2ssn(nvis){
  var d = 12*nvis.year+nvis.month;
  d = d/12;
  nvis.cycleCoe = 1.0 - (Math.abs(2025.5-d))/6.0; 
  d=nvis.cycleCoe * 120;
  nvis.ssn = parseInt(d)
  return d;
}
function ssn2year(nvis){
  var d = nvis.ssn/24;
  d += 2020;
  nvis.year= parseInt(d);
  return d;
}

function Dist2El(nvis) {   // Distance to elevation
  var a, b=6371,c, A, B,C;   // Triangle
  b=6371; c= b+nvis.hF2;     // sides b and c are known constants
  A = Math.PI*nvis.distance/40000; // great circle ang.distance
  a = c*c+b*b-2*(b*c*Math.cos(A)); // cos rule, 
  a = Math.sqrt(a);                     // side a = path.dist/2
  console.log("Dist2El(1) A="+R2D(A)+" deg,  a="+ a + " km");
  B = (b/a)*Math.sin(A); B = Math.asin(B); // sine law => B
  C = Math.PI-A-B;  // C = 180-A-B
  console.log("Dist2El(2) B="+R2D(B)+" deg,  C="+ R2D(C) + " deg");
  nvis.elev = C-Math.PI/2;        // Elev = C-90deg
  nvis.slm = 1.0/Math.cos(B);     // secant law multiplier
  nvis.pathdist = a*2;            // FSPL distance
  nvis.B = B;
  console.log("Dist2El(3) El=",+R2D(nvis.elev)+", PaDi="+nvis.pathdist+", slm="+nvis.slm+", B="+R2D(nvis.B)); 
  return nvis.elev;
}

function calcSlm(nvis) {   // Secant law multiplier
  var el1, el2, di1, di2, hops=1;
  el1 = D2R(nvis.elevMin);   // site minimum elevation - deg to rad
  di1 = nvis.distance;
  el2 = Dist2El(nvis);      // elevation angle in radians
  while (el2 < el1) {
    hops++;
    nvis.distance = di1 / hops;
    el2 = Dist2El(nvis); // elevation angle in radians
  }
  console.log("calcSlm(1) hops="+hops+", el1="+ R2D(el1)+", el2="+R2D(el2) );
  nvis.elev=el2;  nvis.hops = hops; 
  nvis.elev *= 180/3.1414;   // into degrees
  console.log("calcSlm(2)Dist="+ nvis.distance+", hops="+nvis.hops);
}

function calcfoF2(nvis) {  // foF2 daily minimum   min 2.0, lat+0.5, fold at S 23 
  var c, d, e, f;
  c=nvis.latCoe;  d = nvis.seasonCoe; e = nvis.cycleCoe;  
  if(c > 1.1)  { c-=1.1; } // fold arround S 10
  f = 2.0 + (c * 0.77);     // min 2.0, lat+0.5, cycle peak summer double 
  f += (d/2);        // summer + 0.5
  //console.log("caclfoF2() 1 f=" + f);
  if (e > 0.88) {  // only peak cycle affects foF2 minimum 
    f *= 2 ; // doubles during peak cycle summer
    f -= d * 2;
  }
  //console.log("caclfoF2() 2 f=" + f);
  if(f < 2.0) { f=2.0;}  
  if(f > 6.5) { f=6.5;}  
  //console.log("caclfoF2() 3 f=" + f);
  nvis.fc1=f;
  //console.log("caclfoF2() 4 fc1=" + this.fc1 + ", fc2=" + this.fc2);
  // foF2 daily maximum 4.7 + 1 for latitude max
  c=nvis.latCoe;  d = nvis.seasonCoe; e = nvis.cycleCoe;
  f=4.7 + c;             // add lattitude, low season first
  if(d > 0.5  &&  c < 0.65 ) { d=0.5 }  // summer and equinox equal, except tropics
  f *= 1 + 0.9*d;   // summer almost doubles in tropics
  f *= (1 + e/5);   // half cycle is 10% improvement
  if(e > 0.88) {  // Sun cycle peak doubles everything
    f*=1.3; 
  }
  //console.log("caclfoF2() 7 f=" + f);
  if(f < 4.7)  { f = 4.7; } 
  if(f > 14.3) { f = 14.3;}
  //console.log("caclfoF2() 8 f=" + f);
  nvis.fc3 = f;                   // daily maximum
  nvis.fc2 = (f + nvis.fc1)/2;    // mid value
  console.log("caclfoF2() fc1=" + nvis.fc1 + ", fc3=" + nvis.fc3);
} 

function latestfoF2(nvis) {  // current foF2 min max from Ionosondes
  var t=nvis.lat;
  var f1=1.8, f3=6.0;            // Mawson Station, Antarctica   
  if(t>-50) {f1=2.3; f3=5.9; }   // Hobart
  if(t>-40) {f1=2.3; f3=7.0; }   // Vic Mid CBR and Hobart
  if(t>-36) {f1=2.4; f3=8.0; }   // Canberra
  if(t>-34.5) {f1=2.5; f3=6.3; } // Camden, Sydney
  if(t>-32.5) {f1=2.5; f3=6.3; } // Perth
  if(t>-31) {f1=2.8; f3=8.5; }   // Brisbane
  if(t>-23) {f1=2.5; f3=10; }    // Townsville
  if(t>-15) {f1=2.6; f3=11.5; }  // Darwin
  if(t>-12) {f1=3.4; f3=11.2; }  // Jicamarca, Peru
  if(t>-3)  {f1=2.4; f3=12; }    // Fortaleza, Brasil  
  if(t>13)  {f1=2.8; f3=11.0;}   // Guam
  if(t>18)  {f1=2.2; f3=8.5; }  // Porto Rico
  if(t>26)  {f1=2.2; f3=12;  }  // Okinawa
  if(t>34)  {f1=2.4; f3=8.8; }  // Nicosia
  if(t>41)  {f1=2.5; f3=8.8; }  // Rome
  if(t>55)  {f1=1.8; f3=7.5; }  // Moscow 
  if(t>69)  {f1=1.4; f3=6.5; }  // Tromso


  
   f2 = (f1+f3)/2;                // adjust f2
  // Mix with prediction
  var ye=2021, mo=10, da=8;   // date when Ionosonde adjusted  
  var d1 = ye*365 + mo*30.5 + da;
  var d2 = nvis.year*365 + nvis.month*30.5 + 15; // date prediction in days
  var me=(d2-d1)/90; me=Math.abs(me);
  if(me > 1.0) me=1.0;
  nvis.fc1*=me; nvis.fc1+=f1*(1-me);
  nvis.fc2*=me; nvis.fc2+=f2*(1-me);
  nvis.fc3*=me; nvis.fc3+=f3*(1-me);
  console.log("latestfoF2(1), f1= "+f1.toFixed(1)+",f3="+f3.toFixed(1)+",me="+me);
}  
  
function showSel(nvis) {
  var s= "Lat=" + nvis.lat  + ", Mon="+ nvis.month + ", Yr=" + nvis.year;
  return s;
}

function showCoe(nvis) {
  var s, s1, s2, s3;
  s1=this.cycleCoe.toFixed(2); s2=this.seasonCoe.toFixed(2); 
  s3=this.latCoe.toFixed(2);
  s="Cor: Cyc=" + s1 + ", Sea=" + s2 +", Lat=" + s3;
  return s;
}

function showfoF2(nvis) {
  var c, d, e, s, s1, s2, s3;
  c= nvis.fc1; d=nvis.fc2; e=nvis.fc3;
  s1=c.toFixed(1); s2=d.toFixed(1); s3=e.toFixed(1);
  s="foF2(MHz): " + s1 + ",  " + s2 +",  " + s3;
  s += ",   SSN="+nvis.ssn.toFixed(0);
  s += ",   M3k="+nvis.slm.toFixed(2);
  return s;
}

function showMuf(nvis) {
  var s1="MUF(MHz): "+nvis.muf1.toFixed(1);
  s1 += ", "+nvis.muf2.toFixed(1);
  s1 += ", "+nvis.muf3.toFixed(1);
  s1 += ",    Hops="+nvis.hops;
  var s2 = '\xB0';
  s1 += ", El="+nvis.elev.toFixed(0)+s2;
  var c = R2D(nvis.B);
  s1 += ", B="+c.toFixed(1);
  return s1;  
}

function cycleCor(nvis) {
  var lat, mon;
  mon = nvis.month; lat = nvis.lat;
  if(lat > 0) {  // reverse for Northern hemisphere
    lat *= -1;            // + vs - 
    mon += 6;             // shift 6 months
    if(mon>12) mon -=12;  // fix overflow
  }
  nvis.cycleCoe = 1.0 - (Math.abs(2025.5-nvis.year))/6.0; 
  //nvis.ssn=nvis.cycleCoe * 100;
  console.log("cycleCor() Yr=" + nvis.year + ",cycleCoe="+nvis.cycleCoe);
  nvis.seasonCoe = (Math.abs(mon-6.0)) / 6.0;
  console.log("cycleCor() Mo=" + nvis.month + ",seasonCoe="+nvis.seasonCoe);
  nvis.latCoe = (lat + 43)/31;
  console.log("cycleCor() lat="+nvis.lat+", latCoe=" + nvis.latCoe);
} 

function nvisPredict (nvis) {
  nvisCheck(nvis);
  cycleCor(nvis);
  calcSlm(nvis);
  calcfoF2(nvis);
  latestfoF2(nvis);
  calcMuf(nvis);
  console.log("nvisPredict() fc1=" + nvis.fc1+ ", fc2=", nvis.fc2);
}
