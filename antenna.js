function antennaGain(nvis) {
  var g=-20.0, fr=nvis.freq, a=nvis.antenna,  h=nvis.mast, e=nvis.elev;
  var s="antennaGain() el="+e+", ";
  if(a == 1) g=antennaDipole(fr, h, e);
  if(a == 2) g=antennaCasgA1(fr, h, e);
  if(a == 3) g=antennaAsF104(fr, h, e);
  if(a == 4) g=antennaRf1944(fr, h, e);
  if(a == 5) g=antennaMil2(fr, h, e);
  if(a == 6) g=antennaWhpBnt(fr, h, e);
  if(a == 7) g=antennaWhp15(fr, h, e);
  if(a == 8) g=antennaHf230(fr, h, e);
  if(a == 9) g=antennaCasgA2(fr, h, e)+5;
  if(a == 10) g=antennaYagi3El(fr, h, e)+8;
  if(a == 11) g=antennaVertMono(fr, h, e);
  nvis.gain=g;
  console.log(s+"Tx a="+a+", fr="+fr+", h="+h+",g="+g);
  a=nvis.antenna2; h=nvis.mast2;
  if(a == 1) g=antennaDipole(fr, h, e);
  if(a == 2) g=antennaCasgA1(fr, h, e);
  if(a == 3) g=antennaAsF104(fr, h, e);
  if(a == 4) g=antennaRf1944(fr, h, e);
  if(a == 5) g=antennaMil2(fr, h, e);
  if(a == 6) g=antennaWhpBnt(fr, h, e);
  if(a == 7) g=antennaWhp15(fr, h, e);
  if(a == 8) g=antennaHf230(fr, h, e);
  if(a == 9) g=antennaCasgA2(fr, h, e);
  if(a == 10) g=antennaYagi3El(fr, h, e);
  if(a == 11) g=antennaVertMono(fr, h, e);
  nvis.gain2=g;
  console.log(s+"Rx a="+a+", fr="+fr+", h="+h+",g="+g);
  return g;
}

function antennaAsF104(fr, h, e) {  // Frequency and mast height matter
  var g= antennaDipole(fr, h, e);  
  return (g-2.5);      
}

function antennaCasgA1(fr, h, e) {  // Frequency and mast height matter
  var g= antennaDipole(fr, h, e);  
  return (g-1.0);      
}

function antennaDipole(fr, h, e) {  // Frequency and mast height matter
  var h= h * fr / 300.0;
  var g=4.3;   // default NVIS gain for 12 m mast, 2 MHz h=0.08 WL
  if(e<72) g=3.2;   if(e<63) g=1.8;     if(e<58) g=0.9; 
  if(e<52) g=-0.2;  if(e<47) g=-1.4;    if(e<42) g=-2.7;
  if(e<37) g=-4.2;  if(e<32) g=-5.7;    if(e<27) g=-7.3;
  if(e<22) g=-9;    if(e<17) g=-10.7;   if(e<12) g=-12.8;
  if(e<9 ) g=-14;   if(e<7)  g=-15.5;   if(e<5) g=-18;
  if(e<3 ) g=-23;   if(e<1.5)  g=-55;   
  if(h < 0.07) g-=1.4;  // lower masts
  if(h < 0.05) g-=1.9;
  if(h < 0.03) g-=3; 
  if(h < 0.09)   return g; // end of lower masts
  if(h < 0.13) {
      g=6;   //  18 m mast, 2 MHz
      if(e<72) g=4.8;   if(e<63) g=3.4;     if(e<58) g=2.5; 
      if(e<52) g=1.3;   if(e<47) g=0;       if(e<42) g=-1.4;
      if(e<37) g=-3.1;  if(e<32) g=-4.8;    if(e<27) g=-6.8;
      if(e<22) g=-8.8;  if(e<17) g=-10.9;   if(e<12) g=-13.3;
      if(e<9 ) g=-14.6;   if(e<7)  g=-16.2; if(e<5) g=-18.6;
      if(e<3 ) g=-23.3;   if(e<1.5)  g=-55;   
      return g;
  }
  if(h < 0.16) {
    g=6.4;   //  22 m mast, 2 MHz
    if(e<72) g=5.3;   if(e<63) g=3.9;     if(e<58) g=3; 
    if(e<52) g=1.8;   if(e<47) g=0.5;     if(e<42) g=-1;
    if(e<37) g=-2.7;  if(e<32) g=-4.6;    if(e<27) g=-6.6;
    if(e<22) g=-8.9;  if(e<17) g=-11.2;   if(e<12) g=-13.8;
    if(e<9 ) g=-15.1;   if(e<7)  g=-16.7; if(e<5) g=-19.2;
    if(e<3 ) g=-23.9;   if(e<1.5)  g=-56;   
    return g;  }
  if(h < 0.20) {
    g=6.6;   // 26 m mast, 2 MHz
    if(e<72) g=5.54;   if(e<63) g=4.2;     if(e<58) g=3.2; 
    if(e<52) g=2.1;   if(e<47) g=0.9;     if(e<42) g=-0.7;
    if(e<37) g=-2.4;  if(e<32) g=-4.3;    if(e<27) g=-6.5;
    if(e<22) g=-8.9;  if(e<17) g=-11.5;   if(e<12) g=-14.2;
    if(e<9 ) g=-15.6;   if(e<7)  g=-17.3; if(e<5) g=-19.7;
    if(e<3 ) g=-24.5;   if(e<1.5)  g=-57;   
    return g;
  }
  if(h < 0.27) {
      g=6.3;   // 36 m mast, 2 MHz
      if(e<72) g=6.3;   if(e<63) g=6.2;     if(e<58) g=6.1; 
      if(e<52) g=5.9;   if(e<47) g=5.7;     if(e<42) g=5.2;
      if(e<37) g=4.7;  if(e<32) g=3.8;    if(e<27) g=2.7;
      if(e<22) g=1.2;  if(e<17) g=-1;   if(e<12) g=-4.2;
      if(e<9 ) g=-6;   if(e<7)  g=-8.5; if(e<5) g=-12;
      if(e<3 ) g=-17.9;   if(e<1.5)  g=-50;   
      return g;
  }
  if(h < 0.34) {
      g=5;   //  46 m mast, 2 MHz
      if(e<72) g=5.5;   if(e<63) g=5.9;     if(e<58) g=6; 
      if(e<52) g=6.1;   if(e<47) g=6.1;     if(e<42) g=5.9;
      if(e<37) g=5.5;  if(e<32) g=4.9;    if(e<27) g=4;
      if(e<22) g=2.6;  if(e<17) g=0.5;   if(e<12) g=-2.6;
      if(e<9 ) g=-4.4;   if(e<7)  g=-6.8; if(e<5) g=-10.3;
      if(e<3 ) g=-16.3;   if(e<1.5)  g=-48;   
      return g;
  }
  if(h < 0.40) {
      g=2.4;   //  56 m mast, 2 MHz
      if(e<72) g=3.7;   if(e<63) g=4.9;     if(e<58) g=5.4; 
      if(e<52) g=5.9;   if(e<47) g=6.2;     if(e<42) g=6.4;
      if(e<37) g=6.3;  if(e<32) g=6;    if(e<27) g=5.3;
      if(e<22) g=4.1;  if(e<17) g=2.2;   if(e<12) g=-0.9;
      if(e<9 ) g=-2.7;   if(e<7)  g=-5.1; if(e<5) g=-8.5;
      if(e<3 ) g=-14.4;   if(e<1.5)  g=-45;   
      return g;
  }  
  if(h < 0.44) {
    g=-3.8;   //  66 m mast, 2 MHz
    if(e<82) g=-2.7;   if(e<77) g=-1.6;  if(e<72) g=-0.2;  
    if(e<67) g=1.2;   if(e<62) g=2.7;    if(e<57) g=4;
    if(e<52) g=5.1;   if(e<47) g=6;     if(e<42) g=6.6;
    if(e<37) g=7;  if(e<32) g=7;    if(e<27) g=6.6;
    if(e<22) g=5.6;  if(e<17) g=3.9;   if(e<12) g=0.9;
    if(e<9 ) g=-0.8;   if(e<7)  g=-3.2; if(e<5) g=-6.6;
    if(e<3 ) g=-12.5;   if(e<1.5)  g=-44;   
    return g;
}
if(h < 0.54) {
  g=-7.8;   //  76 m mast, 2 MHz
  if(e<82) g=-9.7;   if(e<77) g=-11.5;  if(e<72) g=-10.7;  
  if(e<67) g=-6.5;   if(e<62) g=-2.6;    if(e<57) g=0.6;
  if(e<52) g=3;   if(e<47) g=5;     if(e<42) g=6.3;
  if(e<37) g=7.3;  if(e<32) g=7.7;    if(e<27) g=7.7;
  if(e<22) g=7;  if(e<17) g=5.5;   if(e<12) g=2.7;
  if(e<9 ) g=1;   if(e<7)  g=-1.3; if(e<5) g=-4.7;
  if(e<3 ) g=-10.6;   if(e<1.5)  g=-42;   
  return g;
}
if(h < 0.66) { 
  g=5.8; // 96 m mast, 2 MHz
  if(e<82) g=-5.4;   if(e<77) g=4.9;  if(e<72) g=4;  
  if(e<67) g=2.5;   if(e<62) g=0;    if(e<57) g=-4.7;
  if(e<52) g=-13.3;   if(e<47) g=-4.5;     if(e<42) g=1.4;
  if(e<37) g=4.8;  if(e<32) g=6.8;    if(e<27) g=7.9;
  if(e<22) g=8;  if(e<17) g=7;   if(e<12) g=4.6;
  if(e<9 ) g=2.9;   if(e<7)  g=0.7; if(e<5) g=-2.6;
  if(e<3 ) g=-8.5;   if(e<1.5)  g=-40;   
  return g;
}
g=5.8;   // 120 m mast and over, 2 MHz
if(e<82) g=6;   if(e<77) g=6.3;  if(e<72) g=6.5;  
if(e<67) g=6.5;   if(e<62) g=6.2;    if(e<57) g=5.4;
if(e<52) g=3.7;   if(e<47) g=0;     if(e<42) g=-8.8;
if(e<37) g=-6.5;  if(e<32) g=1.8;    if(e<27) g=5.5;
if(e<22) g=6.9;  if(e<17) g=6.9;   if(e<12) g=5;
if(e<9 ) g=3.6;   if(e<7)  g=1.5; if(e<5) g=-1.8;
if(e<3 ) g=-7.6;   if(e<1.5)  g=-35;   
return g;
}

function antennaYagi3El(fr, h, e) {   // Frequency and mast height matter
  var h= h * fr / 300.0;              // height in lambda fractions
  var g=4.2;           // default NVIS gain for 12 m mast, 2 MHz h=0.08 WL
  if(e<87) g=5.3;   if(e<82) g=6.2;     if(e<77) g=6.9; 
  if(e<72) g=7.4;   if(e<63) g=7.8;     if(e<58) g=7.9; 
  if(e<52) g=7.8;  if(e<47) g=7.3;    if(e<42) g=6.7;
  if(e<37) g=6;  if(e<32) g=5;    if(e<27) g=3.8;
  if(e<22) g=2;    if(e<17) g=-0.3;   if(e<12) g=-3.7;
  if(e<9 ) g=-5.6;   if(e<7)  g=-8;   if(e<5) g=-11.5;
  if(e<3 ) g=-17.6;   if(e<1.5)  g=-50;   
  if(h < 0.20) {
    g=4.4;   // 26 m mast, 2 MHz
    if(e<82) g=5.4;   if(e<77) g=6.2;  if(e<72) g=7;  
    if(e<67) g=7.7;   if(e<63) g=8.2;     if(e<58) g=8.7; 
    if(e<52) g=9;   if(e<47) g=9.1;     if(e<42) g=9;
    if(e<37) g=8.6;  if(e<32) g=8;    if(e<27) g=6.9;
    if(e<22) g=5.4;  if(e<17) g=3.2;   if(e<12) g=0;
    if(e<9 ) g=-2;   if(e<7)  g=-4.4; if(e<5) g=-7.8;
    if(e<3 ) g=-13.8;   if(e<1.5)  g=-52;   
    return g;
  }
  if(h < 0.27) {
      g=3.4;   // 36 m mast, 2 MHz
      if(e<82) g=4.6;   if(e<77) g=5.5;  if(e<72) g=6.4;  
      if(e<67) g=7.3;   if(e<63) g=8.2;     if(e<58) g=8.9; 
      if(e<52) g=9.4;   if(e<47) g=5.7;     if(e<42) g=9.7;
      if(e<37) g=9.8;  if(e<32) g=9.2;    if(e<27) g=8.3;
      if(e<22) g=6.9;  if(e<17) g=4.9;   if(e<12) g=1.7;
      if(e<9 ) g=-0.1;   if(e<7)  g=-2.5; if(e<5) g=-6;
      if(e<3 ) g=-12;   if(e<1.5)  g=45;   
      return g;
  }
  if(h < 0.40) {
      g=-2.3;   //  56 m mast, 2 MHz
      if(e<82) g=-0.5;   if(e<77) g=1.1;  if(e<72) g=2.7;  
      if(e<67) g=4.4;   if(e<63) g=6;     if(e<58) g=7.5; 
      if(e<52) g=8.7;   if(e<47) g=9.7;     if(e<42) g=10.4;
      if(e<37) g=10.8;  if(e<32) g=10.8;    if(e<27) g=10.3;
      if(e<22) g=9.4;  if(e<17) g=7.6;   if(e<12) g=4.6;
      if(e<9 ) g=2.8;   if(e<7)  g=0.5; if(e<5) g=-3;
      if(e<3 ) g=-9;   if(e<1.5)  g=-41;   
      return g;
  }  
if(h < 0.54) {
  g=-26.3;   //  76 m mast, 2 MHz
  if(e<82) g=-44.7;   if(e<77) g=-20;  if(e<72) g=-11.7;  
  if(e<67) g=-5.8;   if(e<62) g=-1.3;    if(e<57) g=2.4;
  if(e<52) g=5.3;   if(e<47) g=7.7;     if(e<42) g=9.5;
  if(e<37) g=10.8;  if(e<32) g=11.6;    if(e<27) g=11.7;
  if(e<22) g=11.2;  if(e<17) g=9.8;   if(e<12) g=7.1;
  if(e<9 ) g=5.3;   if(e<7)  g=3; if(e<5) g=-0.4;
  if(e<3 ) g=-6.3;   if(e<1.5)  g=-37;   
  return g;
}
if(h < 0.66) { 
  g=0.9; // 96 m mast, 2 MHz
  if(e<82) g=1.5;   if(e<77) g=1.7;  if(e<72) g=1.5;  
  if(e<67) g=0.6;   if(e<62) g=-1.7;    if(e<57) g=-7.6;
  if(e<52) g=-15.2;   if(e<47) g=-0.5;     if(e<42) g=5.1;
  if(e<37) g=8.6;  if(e<32) g=10.7;    if(e<27) g=11.9;
  if(e<22) g=12.1;  if(e<17) g=11.2;   if(e<12) g=8.8;
  if(e<9 ) g=2.9;   if(e<7)  g=0.7; if(e<5) g=-2.6;
  if(e<3 ) g=-4.4;   if(e<1.5)  g=-35;   
  return g;
}
g=1.1;   // 120 m mast and over, 2 MHz
if(e<82) g=2.6;   if(e<77) g=3.8;  if(e<72) g=5.1;  
if(e<67) g=6.1;   if(e<62) g=6.7;    if(e<57) g=6.7;
if(e<52) g=5.5;   if(e<47) g=2.1;     if(e<42) g=-10.2;
if(e<37) g=-0.8;  if(e<32) g=-0.7;    if(e<27) g=10.7;
if(e<22) g=12.3;  if(e<17) g=12.3;   if(e<12) g=10.5;
if(e<9 ) g=7.2;   if(e<7)  g=4.9; if(e<5) g=1.6;
if(e<3 ) g=-2.3;   if(e<1.5)  g=-32;   
return g;
}


function antennaRf1944(fr, h, e) {  
 var g = antennaCasgA1(fr, h, e); 
 var d=22.5; 
 if(fr<2.6)   d=20;  if(fr<3.1)   d=18;
 if(fr<3.6)   d=17;  if(fr<4.1)   d=16;
 if(fr<5.1)   d=16;  if(fr<6.1)   d=17;
 if(fr<7.1)   d=16;  if(fr<8.1)   d=15;
 if(fr<9.1)   d=14.5; if(fr<10.1)  d=14;
 if(fr<12.1)  d=13;
 return (g-d);   
}

function antennaMil2(fr, h, e) {   
 if(fr<2.1)  return -27;
 if(fr<2.6)  return -16;
 if(fr<3.1)  return -9.1;
 if(fr<3.6)  return -13;
 if(fr<4.1)  return -15.6;
 if(fr<5.1)  return -17;
 if(fr<6.1)  return -17;
 if(fr<7.1)  return -17;
 if(fr<8.1)  return -15;
 if(fr<9.1)  return -9;
 if(fr<10.1)  return -18;
 if(fr<12.1)  return -15;
 return -13;          
}

function antennaWhpBnt(fr, h, e) {  // only frequency matters
  var g;
  g=-7; if(e<78) g=-6;   if(e<63) g=-4;   if(e<48) g=-3; 
  if(e<33) g=-2;  if(e<18) g=-3; 
  if(fr<11){
    g=-9; if(e<78) g=-7;   if(e<63) g=-5;   if(e<48) g=-3; 
    if(e<33) g=-3;  if(e<18) g=-4;
  }
  if(fr<9){
    g=-11; if(e<78) g=-9;   if(e<63) g=-7;   if(e<48) g=-5; 
    if(e<33) g=-5;  if(e<18) g=-6;
  }
  if(fr<7.5){
    g=-13; if(e<78) g=-10;   if(e<63) g=-8;   if(e<48) g=-7; 
    if(e<33) g=-6;  if(e<18) g=-7;
  }
  if(fr<6.5){
    g=-15; if(e<78) g=-12;   if(e<63) g=-10;   if(e<48) g=-8; 
    if(e<33) g=-7;  if(e<18) g=-9;
  }
  if(fr<5.5){
    g=-18; if(e<78) g=-15;   if(e<63) g=-12;   if(e<48) g=-10; 
    if(e<33) g=-9;  if(e<18) g=-11;
  }
  if(fr<4.5){
    g=-21; if(e<78) g=-18;   if(e<63) g=-15;   if(e<48) g=-13; 
    if(e<33) g=-12;  if(e<18) g=-13;
  }
  if(fr<3.5){
    g=-24; if(e<78) g=-21;   if(e<63) g=-18;   if(e<48) g=-16; 
    if(e<33) g=-15;  if(e<18) g=-16;
  }
  if(fr<2.5){
    g=-28; if(e<78) g=-25;   if(e<63) g=-23;   if(e<48) g=-21; 
    if(e<33) g=-20;  if(e<18) g=-21;
  }
  return g;
}

function antennaCasgA2(fr, h, e) {  // only frequency matters
  var g=-9;
  if(fr<2.5) {  // 2 MHz
    g=-6.6; 
    if(e<78) g=-5.8;   if(e<63) g=-5;   if(e<48) g=-4.4; 
    if(e<33) g=-4.2;  if(e<18) g=-4.9; if(e<11) g=-6.3;
    if(e<8) g=-4.9;if(e<5) g=-11.4; if(e<2) g=-50;
    g = g-2.4; // coupler loss
    return g;
  }
  if(fr<2.75) {  // 2.5 MHz
    g=-4; 
    if(e<78) g=-3.6;   if(e<63) g=-3.2;   if(e<48) g=-3; 
    if(e<33) g=-3.1;  if(e<18) g=-4.2; if(e<11) g=-5.7;
    if(e<8) g=-7.3;if(e<5) g=-11.1; if(e<2) g=-50;
    g = g-1.1; // coupler loss
    return g;
  }
  if(fr<3.25) {  // 3 MHz
    g=-1.9; 
    if(e<78) g=-1.7;   if(e<63) g=-1.7;   if(e<48) g=-1.9; 
    if(e<33) g=-2.4;  if(e<18) g=-3.8; if(e<11) g=-5.5;
    if(e<8) g=-7.2;if(e<5) g=-11.1; if(e<2) g=-50;
    g = g-0.22; // coupler loss
    return g;
  }
  if(fr<4.25) {  // 4 MHz
    g=1.2; 
    if(e<78) g=1.1;   if(e<63) g=0.5;   if(e<48) g=-0.5; 
    if(e<33) g=-1.8;  if(e<18) g=-4; if(e<11) g=-6;
    if(e<8) g=-7.9;if(e<5) g=-12; if(e<2) g=-50;
    g = g-0.4; // coupler loss
    return g;
  }
  if(fr<5.25) {  // 5 MHz 
    g=3.5; 
    if(e<78) g=3.3;   if(e<63) g=2.6;   if(e<48) g=1.2; 
    if(e<33) g=-1.4;  if(e<18) g=-6.6; if(e<11) g=-11;
    if(e<8) g=-14;if(e<5) g=-19.9; if(e<2) g=-50;
    g = g-0.28; // coupler loss
    return g;
  }
  if(fr> 5.5) {  // 6 MHz 
    g=4.8; 
    if(e<78) g=4.6;   if(e<63) g=3.7;   if(e<48) g=2.2; 
    if(e<33) g=-0.3;  if(e<18) g=-4.6; if(e<11) g=-7.7;
    if(e<8) g=-10;if(e<5) g=-15; if(e<2) g=-50;
    g = g-0.11; // coupler loss
    return g;
  }  
  return g;
}

function antennaWhp15(fr, h, e) { // only frequency matters
    var g;
    g=-11; if(e<78) g=-8;   if(e<63) g=-5;   if(e<48) g=-2; 
    if(e<33) g=-0;  if(e<18) g=-1; 
    if(fr<11){
      g=-12; if(e<78) g=-8;   if(e<63) g=-5;   if(e<48) g=-2; 
      if(e<33) g=-0;  if(e<18) g=-1;
    }
    if(fr<9){
      g=-15; if(e<78) g=-10;   if(e<63) g=-6;   if(e<48) g=-3; 
      if(e<33) g=-2;  if(e<18) g=-3;
    }
    if(fr<7.5){
      g=-16; if(e<78) g=-10;   if(e<63) g=-6;   if(e<48) g=-4; 
      if(e<33) g=-2;  if(e<18) g=-3;
    }
    if(fr<6.5){
      g=-17; if(e<78) g=-10;   if(e<63) g=-6;   if(e<48) g=-4; 
      if(e<33) g=-2;  if(e<18) g=-3.6;
    }
    if(fr<5.5){
      g=-19; if(e<78) g=-12;   if(e<63) g=-7;   if(e<48) g=-5; 
      if(e<33) g=-4;  if(e<18) g=-5;
    }
    if(fr<4.5){
      g=-22; if(e<78) g=-13;   if(e<63) g=-9;   if(e<48) g=-7; 
      if(e<33) g=-6;  if(e<18) g=-5;
    }
    if(fr<3.5){
      g=-26; if(e<78) g=-16;   if(e<63) g=-12;   if(e<48) g=-9; 
      if(e<33) g=-8;  if(e<18) g=-9;
    }
    if(fr<2.5){
      g=-31; if(e<78) g=-21;   if(e<63) g=-16;   if(e<48) g=-14; 
      if(e<33) g=-12;  if(e<18) g=-13;
    }
    return g;
  }
  function antennaHf230(fr, h, e) {  // assumed on PMV
    var g;
    g=-23.8; if(e<45) g=-25;   if(e<23) g=-27.3; // fr=2   
    if(fr>2.15){
      g=-21.5; if(e<38) g=-23;   if(e<22) g=-24.9;    
    }
    if(fr>2.75){
      g=-17.6; if(e<38) g=-18.6;   if(e<22) g=-20.5;    
    }
    if(fr>3.25){
      g=-15; if(e<38) g=-15.8;   if(e<22) g=-17.6;    
    }
    if(fr>3.75){
      g=-13.2; if(e<38) g=-13.8;   if(e<22) g=-15.6;    
    }
    if(fr>4.5){
      g=-10.5; if(e<38) g=-10.6;   if(e<22) g=-12.5;    
    }
    if(fr>5.5){
      g=-8.6; if(e<38) g=-8.2;   if(e<22) g=-10;    
    }
    if(fr>6.5){
      g=-7.3; if(e<53) g=-6;   if(e<22) g=-8;    
    }
    if(fr>7.5){
      g=-6.3; if(e<53) g=-4.4;   if(e<22) g=-6.2;    
    }
    if(fr>8.5){
      g=-5.2; if(e<70) g=-3.5;   if(e<22) g=-4.4;    
    }
    if(fr>9.5){
      g=-3.2; if(e<68) g=-1.4;   if(e<22) g=-2.4;    
    }
    if(fr>10.5){
      g=-1.9; if(e<68) g=-0.4;   if(e<22) g=-1.6;    
    }
    if(fr>11.5){
      g=-0.9; if(e<68) g=-0.3;   if(e<22) g=-1.3;    
    }
    if(fr>13.5){
      g=0.2; if(e<68) g=1.2;   if(e<22) g=-0.6;    
    }
    if(fr>16.5){
      g=0.2; if(e<68) g=1;   if(e<22) g=-0.2;    
    }
    if(fr>19.5){
      g=0.3; if(e<68) g=1.1;   if(e<22) g=-3.3;    
    }
    if(fr>22.5){
      g=0.8; if(e<68) g=1.6;   if(e<22) g=-2.7;    
    }
    if(fr>24.5){
      g=1.2; if(e<68) g=2;   if(e<22) g=-1.9;    
    }

    return g;
  }
  function antennaVertMono(fr, h, e) {  // Vertical monopole, 6 radials on the ground
    var g=-19.3;                        // default at 90 deg elevation
    if(e<87) g=-14.3;   if(e<82) g=-11.1;     if(e<77) g=-8.7; 
    if(e<72) g=-6.8;    if(e<67) g=-5.2;      if(e<62) g=-4;
    if(e<57) g=-2.8;    if(e<52) g=-2;        if(e<47) g=-1.2;
    if(e<42) g=-0.6;    if(e<37) g=-0.1;      if(e<17) g=-0.8; 
    if(e<12) g=-2.4;    if(e<9) g=-3.5;       if(e<7)   g=-5;
    if(e<5)  g=-7.6;    if(e<3) g=-12.5;      if(e<1.5) g=-35; 
    return g;
  }
  
  
  
   



