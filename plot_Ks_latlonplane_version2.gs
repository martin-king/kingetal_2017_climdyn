function plot

*see ian james, p. 176.
*run with grads -l

'reset'

*IHB
'set x 1 180'
'set y 1 91'
'set t 1 140'
'define f0=2.*7.292e-5*sin(lat*3.1416/180.)'
'define metr=cos(lat*3.1416/180)'
'define xx=2*3.1416*6.37e6*metr'
'define dx=cdiff(lon,x)*3.1416/180*6.37e6*metr'
'define dy=cdiff(lat,y)*3.1416/180*6.37e6'
'define beta=cdiff(f0,y)/dy'

*IHB zg500 is uwnd here
'define uy=cdiff(uwnd,y)/dy'
'define uyy=cdiff(uy,y)/dy'
*
'define ks=sqrt((beta-uyy)/uwnd)*xx/(2*3.1416)'
'set t 1'
'define ks2=ave(ks,t=111,t=138,1yr)'
'define ks1=ave(ks,t=77,t=110,1yr)'
*
'variance2=ave(pow(ks-ks2,2),t=111,t=138)'
'variance1=ave(pow(ks-ks1,2),t=77,t=110)'
'sig=abs(ks2-ks1)-1.7*sqrt(variance2/28+variance1/34)'

*for landscape 0 11 0 8.5 is maximum
'set vpage 0.5 10.5 0.5 6.'
'set grads off'
'set display color white'
'set rgb 17 90 90 90'
'set map 17 1 6'
'set ylint 30'
'set grid on 5 1'
'set xlopts 1 5 0.2'
'set ylopts 1 5 0.2'
'set lat -90 90'
'set gxout shaded'
*IHB
'run /Users/martinpeterking/work_2016dec.dir/martinking_temporary.dir/Desktop/work_sep2016.dir/some_grads_scripts.dir/scripts/rgbset.gs'
*IHB
*use this for Ks.
*'set clevs 3 4 5 6 7 8 9 10 12'
*'set ccols 15 44 46 36 38 23 24 25 26 69'
*use this for Ks difference.
'set ccols  49 46 44 42  80  23 25 27 28 '
'set clevs -0.4 -0.3 -0.2 -0.1 0.1 0.2 0.3 0.4'

*rad/m times m divide 2pi = number of cycles
*IHB
*Just Ks: 
*'d ks2'
*Ks difference:
*'d ks2-ks1'
'd maskout(ks2-ks1,sig)'

'set font 0'
*IHB
'draw title Nov: Ks 1981/08-1947/80, 70mb, NOAA-CIRES ReAn'

*IHB
'run /Users/martinpeterking/work_2016dec.dir/martinking_temporary.dir/Desktop/work_sep2016.dir/some_grads_scripts.dir/scripts/cbar.gs 1.2 1 9.7 3.'
* cbar.gs sf vert xmid ymid






return
