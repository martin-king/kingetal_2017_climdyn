function plot

*see ian james, p. 176.
*run with grads -l

'reset'

*IHB
'set x 1'
'set y 1 91'
'set z 1 24'
'define f0=2.*7.292e-5*sin(lat*3.1416/180.)'
'define metr=cos(lat*3.1416/180)'
'define xx=2*3.1416*6.37e6*metr'
*'define dx=cdiff(lon,x)*3.1416/180*6.37e6*metr'
'define dy=cdiff(lat,y)*3.1416/180*6.37e6'
'define beta=cdiff(f0,y)/dy'

*IHB
'define unov=ave(uwnd,time=dec1947,time=dec1980,1yr)'
'define unovy=cdiff(unov,y)/dy'
'define unovyy=cdiff(unovy,y)/dy'
*
'define unov2=ave(uwnd,time=dec1981,time=dec2008,1yr)'
'define unov2y=cdiff(unov2,y)/dy'
'define unov2yy=cdiff(unov2y,y)/dy'

*for landscape 0 11 0 8.5 is maximum
'set vpage 0. 8.5 0. 5.'
'set grads off'
'set display color white'
'set rgb 17 90 90 90'
'set map 17 1 6'
*'set ylint 200'
'set xlint 10'
'set ylevs 1000 800 700 500 300 200 100'
'set grid on 5 1'
'set xlopts 1 5 0.2'
'set ylopts 1 5 0.26'
'set lat 0 90'
'set gxout shaded'
*IHB
'run /Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/some_grads_scripts.dir/scripts/rgbset.gs'
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
*'d sqrt((beta-unovyy)/unov)*xx/(2*3.1416)'
*Ks difference:
'var=sqrt((beta-unov2yy)/unov2)*xx/(2*3.1416)-sqrt((beta-unovyy)/unov)*xx/(2*3.1416)'
'd var'

'set font 0'
*IHB
'draw title Nov: Ks 1981/08-1947/1980'

*IHB
'run /Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/some_grads_scripts.dir/scripts/cbar.gs 1. 0 4.7 0.3'
* cbar.gs sf vert xmid ymid


return
