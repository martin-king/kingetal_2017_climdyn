function xsea

*writing out zonal mean is commented out here.

*'q file'
*dimen=sublin(result,5)
*xdim=subwrd(dimen,3)
*ydim=subwrd(dimen,6)
'reset'
'set x 1 144'
'set y 1 73'
'set z 2'
*'set x 1'
*'set y 1 91'
*'set z 1 24'

*'set fwrite -le -st noaacires_uwnd_zonalmean_djfm_1871_2011.grd'
'set fwrite -le -st ncep_z500mz1000_djf_1948_2015.grd'
'set gxout fwrite'

*t=385
*t=389
*tmax=792
t=13
tmax=818

while(t<=tmax)
 'set t 't
  say t
 'd ave(hgt(z=6)-hgt(z=1),t-1,t+1)'
*for writing out useful land area fraction from speedy  'd const(maskout(lsm/lsm,lsm-0.6)*100,0,-u)'
*  'd ave(air,t-1,t+1)'
*  'd hgt'
*  'd ave(ustarvstar,t-1,t+1)'
*  'avg1=75*diaheat(z=1)*pow(1000/lev(z=1),-0.286)'
*  'avg2=112.5*diaheat(z=2)*pow(1000/lev(z=2),-0.286)'
*  'avg3=125*diaheat(z=3)*pow(1000/lev(z=3),-0.286)'
*  'avg4=100*diaheat(z=4)*pow(1000/lev(z=4),-0.286)'
*  'avg5=100*diaheat(z=5)*pow(1000/lev(z=5),-0.286)'
*  'avg6=100*diaheat(z=6)*pow(1000/lev(z=6),-0.286)'
*  'avg7=100*diaheat(z=7)*pow(1000/lev(z=7),-0.286)'
*  'avg8=100*diaheat(z=9)*pow(1000/lev(z=9),-0.286)'
*  'd (avg1+avg2+avg3+avg4+avg5+avg6+avg7+avg8)/812.5*86400'
*   'd ave(ave(uwnd,lon=0,lon=360),t-1,t+1)'
*    'd air'
  t=t+12
endwhile

*'quit'
'disable fwrite'


return
