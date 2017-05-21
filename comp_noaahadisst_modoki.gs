function reg_ncepnoaa

'reset'
*'set xlopt color thickness size'
*'set vpage 0 11 0 8.5'
*’set xlopts 1 10 0.29'
*’set ylopts 1 10 0.29'
*’set lat -30 70'
*'set lon 0 360'

ts=84
te=124
tt=te-ts+1

*'/Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/scripts/polst 0 n'

'set t 1'
'sstave=ave(sst.1,t='ts',t='te')'
'set t 'ts' 'te
'sstanom=maskout(sst.1,sst.1)-sstave'
'regiona=aave(sstanom,lon=165,lon=220,lat=-10,lat=10)'
'regionb=aave(sstanom,lon=250,lon=280,lat=-15,lat=5)'
'regionc=aave(sstanom,lon=125,lon=145,lat=-10,lat=20)'
*emi 
'nino4ori=regiona-(0.5*regionb)-(0.5*regionc)'
*hegyi and deng CP 'nino4ori=aave(sstanom,lon=165,lon=230,lat=-10,lat=15)'
*nino3.4 'nino4ori=aave(sstanom,lon=190,lon=240,lat=-5,lat=5)'
*nino 4 'nino4ori=aave(sstanom,lon=160,lon=210,lat=-5,lat=5)'
*nino 3 'nino4ori=aave(sstanom,lon=215,lon=265,lat=-5,lat=5)'

'/Users/martinpeterking/work_2016dec.dir/martinking_temporary.dir/Desktop/work_sep2016.dir/scripts/polst 0 n'

'set t 1'
'set dfile 2'
'zg500av2d=ave(zg500.2,t='ts',t='te')'

'set t 'ts' 'te
'zg500anom2d=zg500.2-zg500av2d'

*BEG for NOV
*N. Atl 'nino4ori=aave(zg500anom2d,lon=-60,lon=0,lat=40,lat=65)'
*NW Russia 'nino4ori=aave(zg500anom2d,lon=30,lon=90,lat=50,lat=80)'
*N Pacific 'nino4ori=aave(zg500anom2d,lon=165,lon=210,lat=40,lat=60)'
*END
*for OND
*N. Atl 'nino4ori=aave(zg500anom2d,lon=-60,lon=0,lat=40,lat=65)'
*NW Russia 'nino4ori=aave(zg500anom2d,lon=30,lon=90,lat=50,lat=75)'
*N Pacific 'nino4ori=aave(zg500anom2d,lon=165,lon=240,lat=40,lat=60)'

'nino4oristd=sqrt(ave(pow(nino4ori,2),t='ts',t='te'))'
'nino4ori=nino4ori/nino4oristd'

*START HERE
'set t 1'
'compop=ave(maskout(maskout(zg500anom2d,nino4ori-1.),-abs(nino4ori)+20),t='ts',t='te')'
'compon=ave(maskout(maskout(zg500anom2d,-nino4ori-1.),-abs(nino4ori)+20),t='ts',t='te')'
'compo=(compop-compon)*0.5'

*EMI
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=20,t=50) = 3 + 6
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=77,t=110) = 5 + 5
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=111,t=138) = 4 + 6
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=1,t=141) = 25 + 24
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=30,t=141) = 20 + 16
*
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=109,t=137) = 4 + 6
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=57,t=85) = 5 + 6
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=84,t=124) = 6 + 6 
*Nino3.4
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=1,t=141) = 26 + 23
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=30,t=141) = 21 + 20
*
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=76,t=112) = 6 + 6
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=69,t=140) = 14 + 13
* sum(maskout(nino4ori,nino4ori-1)/maskout(nino4ori,nino4ori-1),t=97,t=125) = 5 + 5

say tt
'variance=ave(pow(maskout(maskout(zg500anom2d,abs(nino4ori)-1.),-abs(nino4ori)+20)-compo,2),t='ts',t='te')'
'tvalue=abs(compo)/sqrt(variance/12)'


'run /Users/martinpeterking/work_2016dec.dir/martinking_temporary.dir/Desktop/work_sep2016.dir/some_grads_scripts.dir/scripts/rgbset.gs'
'set display color white'
'set grads off'
'set ylint 30'
'set xlint 30'
'set grid on 5 1'
'set mpdraw on'
'set rgb 17 80 80 80'
'set map 17 1 6'
'set gxout shaded'
'set rgb 16 200 200 200'
'set rbcols 16'
'set cmin 0'
'd tvalue-1.8'

*'run /Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/some_grads_scripts.dir/scripts/cbar.gs 1. 1 9.4 2.8'
* cbar.gs sf vert xmid ymid

'set gxout contour'
'set clab on'
'set cint 5'
'set cmax -1'
'set ccolor 58'
*'set ccolor 1'
*’set clevs -6 -4 -2 -1'
'set clopts -1 -1 0.15'
*'set clskip 2'
'set cstyle 2'
'set cthick 6'
'd compo'
'set cint 5'
'set cmin 1'
'set cstyle 1'
'set ccolor 69'
*'set ccolor 1'
*’set clevs 1 2 4 6'
'd compo'
'set clab on'
'set clevs 0'
'set ccolor 1'
'set cstyle 1'
'set grads off'
*'set mpdraw off'
'set cthick 10'
'd compo'

*'run /Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/scripts/pl_rbth_o.gs  reg2dz 10'

'set line 1'
'query w2xy 47 65'
xpos = subwrd(result,3)
ypos = subwrd(result,6)
*say '    (xpos,ypos) = ('xpos','ypos')'
*'draw mark 3 'xpos' 'ypos' 0.22'

'query w2xy 145 38'
xpos = subwrd(result,3)
ypos = subwrd(result,6)
*say '    (xpos,ypos) = ('xpos','ypos')'
*'draw mark 3 'xpos' 'ypos' 0.22'

'query w2xy 227 46'
xpos = subwrd(result,3)
ypos = subwrd(result,6)
*say '    (xpos,ypos) = ('xpos','ypos')'
*'draw mark 3 'xpos' 'ypos' 0.22'

'query w2xy 315 40'
xpos = subwrd(result,3)
ypos = subwrd(result,6)
*say '    (xpos,ypos) = ('xpos','ypos')'
*'draw mark 3 'xpos' 'ypos' 0.22'

return
