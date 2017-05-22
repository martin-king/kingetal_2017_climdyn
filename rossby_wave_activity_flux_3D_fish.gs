function tnflux

*mpk change below zsel; the output grd filename; and month you want
*mpk the original comments; not all of them relevant anymore:
* Horizontal wave-activity flux derived by Takaya and Nakamura (1999, 2001)
* Used data;  Model output data of "miroc3_2_medres" for  IPCC AR4 20c3m
* Monthly-mean zonal and meridional wind (ua_A1, va_A1), geopotential height (zg_A1)
* NetCDF files have monthly-mean, multiple-level data. 
* The unit of level is [hPa]
* Basic state ; climatology of monthly-mean field (January)
*                   averaged from 1979 to 1998.
* Perturbation ; monthly-mean anomalies in January 1990.
* Level; 250 hPa


*-----
'reinit'
*mpk ncep-ncar reanalysis data
* u
'sdfopen ./uwnd.mon.mean.nc'
* v
'sdfopen ./vwnd.mon.mean.nc'
* height
'sdfopen ./hgt.mon.mean.nc'
*air in C originally
'sdfopen ./air.mon.mean.nc'

*  gas constant
'define Ra=290'
* earth radius
'define a=6400000'

*mpk 'define dlat = cdiff(lat,y)*3.14/180'
*mpk 'define dlon = cdiff(lon,x)*3.14/180'
'define coslat = cos(lat*3.1415/180)'
'define sinlat = sin(lat*3.1415/180)'
* Coriolis parameter
'define f = 2*7.272/100000*sinlat'
'define f0 = 2*7.272/100000*sin(43*3.1415/180)'
'define g=9.81'
'define scaleheight=Ra*250/g'
'define kappa=0.286'

* unit [hPa]
*mpk select level you want
*level = 1000, 950, 900, 850, 800, 750, 700, 650, 600, 
*550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 70, 50, 30, 20, 10
zsel=4
'set z 'zsel-1' 'zsel+1

* For drawing polar projection 
*mpk 'set lon -5 365'
'set x 1 180'
'set y 1 91'
'set t 1 12'

*mpk making basic state (climatology) for Jan 1979 to Dec 2012
'define uclm = ave(uwnd.1,t+0,t=792,12)'
'define vclm = ave(vwnd.2,t+0,t=792,12)'
'define zclm = ave(hgt.3,t+0,t=792,12)'
'define Tclm = ave(air.4,t+0,t=792,12)'

* magnitude of basic state wind speed
'define magU = mag(uclm,vclm)'

'modify uclm seasonal'
'modify vclm seasonal'
'modify zclm seasonal'
'modify Tclm seasonal'
'modify magU seasonal'

'set t 1 '
'set x 1 180'
'set y 1 91'
*mpk output filename
'set fwrite -le noaacires_tnflux850_nov_1871_2011_fish.grd'
'set gxout fwrite'
*mpk output months
t=11
tmax=1692

while(t<=tmax)
 'set t 't
*-------calculation part
* anomalies
'set z 'zsel-1' 'zsel+1
'define zaa=hgt.3-zclm'
* QG stream function
'define psiaa=g/f*zaa'

'set z 'zsel
'dz=-scaleheight*log(lev(z+1)/lev(z-1))'
'dTdz=(Tclm(z+1)-Tclm(z-1))/dz'
*mpk buoyancy frequency
'stabmdd=g/Tclm(z+0)*dTdz+g*kappa/scaleheight'

'define one=1+0*lat'
*mpk 'define dpsidlon = cdiff(psiaa,x)/dlon'
'define dpsidx = -muadv(one,psiaa)'
*mpk 'define ddpsidlonlon = cdiff(dpsidlon,x)/dlon'
'define ddpsidxx = -muadv(one,dpsidx)'

*mpk 'define dpsidlat = cdiff(psiaa,y)/dlat'
'define dpsidy = -mvadv(one,psiaa)'
*mpk 'define ddpsidlatlat = cdiff(dpsidlat,y)/dlat'
'define ddpsidyy = -mvadv(one,dpsidy)'
*mpk 'define ddpsidlatlon = cdiff(dpsidlat,x)/dlon'
'define ddpsidyx = -muadv(one,dpsidy)'

*mpk
'define dpsidz=(psiaa(z+1)-psiaa(z-1))/dz'

*mpk 'define termxu = dpsidlon*dpsidlon-psiaa*ddpsidlonlon'
'define termxu = dpsidx*dpsidx-psiaa*ddpsidxx'

*mpk'define termxv = dpsidlon*dpsidlat-ddpsidlatlon*psiaa'
'define termxv = dpsidx*dpsidy-ddpsidyx*psiaa'

*mpk 'define termyv = dpsidlat*dpsidlat-psiaa*ddpsidlatlat'
'define termyv = dpsidy*dpsidy-psiaa*ddpsidyy'

*mpk
'termzu=dpsidx*dpsidz-psiaa*(-muadv(one,dpsidz))'
'termzv=dpsidy*dpsidz-psiaa*(-mvadv(one,dpsidz))'

* "p" is normalized by 1000hPa
'define coeff1=coslat*(lev/1000)/(2*magU)'

*x-component
*mpk 'define px = coeff1/(a*a*coslat)*( uclm*termxu/coslat + vclm*termxv)'
'define px = coeff1*(uclm*termxu + vclm*termxv)'

*y-component
*mpk 'define py = coeff1/(a*a)*( uclm/coslat*termxv + vclm*termyv)'
'define py = coeff1*(uclm*termxv + vclm*termyv)'

*mpk z-component
'define pz = coeff1*f*f*(uclm*termzu + vclm*termzv)/stabmdd'

*'define diver=hdivg(px,py)'
*-------calculation part end

 'd px'
 'd py'
 'd pz'
 'd psiaa'
 'd fish_div(px,py)'
*  'd muadv(one,px)+mvadv(one,py)'
* 'd diver'
 t=t+12
endwhile

'disable fwrite'

*'set gxout contour'
*'set cint 30'
*'set black -0.1 0.1'

* stream-function-like geopotential height
*'d maskout( zaa*abs(f0/f),  abs(lat)-10)'

* horizontal wave-activity flux
* 'set arrscl 0.5 20'
* 'd skip(px,3,3);maskout( py , abs(lat)-10)'

return
