function reg_ncepnoaa

'reset'
*'set xlopt color thickness size'
'set vpage 0 11 0 4.5'
'set xlopts 1 10 0.29'
'set ylopts 1 10 0.29'
*'set lat -30 70'
*'set lon 0 360'

ts=20
te=50
tt=te-ts+1

*'/Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/scripts/polst 0 n'

'set t 1'
'sstave=ave(maskout(sst.1,sst.1),t='ts',t='te')'
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

*'/Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/scripts/polst 30 n'

'set t 1'
'set dfile 2'
'zg500av2d=ave(zg500.2*2e11,t='ts',t='te')'
*'zg500av2d=ave(zg500.2-ave(zg500.2,lon=-180,lon=180),t='ts',t='te')'
*'nino4ave=ave(nino4ori,t=1,t=41)'

'set t 'ts' 'te
*'slpav2d=ave(slp.2,t-2,t+2)'
'zg500anom2d=(zg500.2*1e11)-zg500av2d'
*'zg500anom2d=(zg500.2-ave(zg500.2,lon=-180,lon=180))-zg500av2d'

*N. Atl 'nino4ori=aave(zg500anom2d,lon=-60,lon=0,lat=40,lat=65)'
*NW Russia 'nino4ori=aave(zg500anom2d,lon=30,lon=90,lat=50,lat=75)'
*N Pacific 'nino4ori=aave(zg500anom2d,lon=165,lon=210,lat=40,lat=60)'
*'nino4ori=-aave(zg500anom2d,lon=-170,lon=-140,lat=40,lat=60)'
*'nino4ori=aave(zg500anom2d,lon=0,lon=30,lat=70,lat=80)'
*'nino4ori=aave(zg500anom2d,lon=30,lon=60,lat=60,lat=70)'
*'nino4ori=-aave(zg500anom2d,lon=120,lon=150,lat=20,lat=50)'

*'set t 1'
*'zg500av2d=ave(zg500.2,t='ts',t='te')'
*'nino4ave=ave(nino4ori,t=1,t=41)'

*'set t 1 75'
*'nino4=nino4ori-nino4ave'

'set t 'ts' 'te
'cova2dz=nino4ori*zg500anom2d'
'cova2d=nino4ori*sstanom'

*START HERE
'set t 1'
'nino4var=ave(pow(nino4ori,2),t='ts',t='te')'
'zg500var2d=ave(pow(zg500anom2d,2),t='ts',t='te')'

'reg2dz=ave(cova2dz,t='ts',t='te')/sqrt(nino4var)'
'reg2d=ave(cova2d,t='ts',t='te')/sqrt(nino4var)'
'covvar2dz=ave(pow(cova2dz/sqrt(nino4var)-reg2dz,2),t='ts',t='te')'
'covvar2d=ave(pow(cova2d/sqrt(nino4var)-reg2d,2),t='ts',t='te')'
say tt
'tstat2d=abs(ave(cova2dz/sqrt(nino4var),t='ts',t='te'))/sqrt(covvar2dz)*sqrt('tt')'
*'tstat2d=abs(ave(cova2d/sqrt(nino4var),t='ts',t='te'))/sqrt(covvar2d)*sqrt('tt')'

'run /Users/martinpeterking/work_2016dec.dir/martinking_temporary.dir/Desktop/work_sep2016.dir/some_grads_scripts.dir/scripts/rgbset.gs'
'set display color white'
'set grads off'
'set ylint 30'
'set xlint 60'
'set grid on 5 1'
'set mpdraw on'
'set rgb 17 80 80 80'
'set map 17 1 7'
'set gxout shaded'
'set rgb 16 180 180 180'
'set rbcols 16'
*'set clevs -0.4 -0.3 -0.2 -0.1 0.1 0.3 0.5 1.'
*'set ccols  48   46   44   42  0   22  24  26  68'  
'set cmin 0'
*'d maskout(reg2d,tstat2d-2.)'
*'set cmax -0.2'
'd tstat2d-0.'

*'run /Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/some_grads_scripts.dir/scripts/cbar.gs 1. 1 9.4 2.8'
* cbar.gs sf vert xmid ymid

'set gxout contour'
'set clab off'
'set cint 5'
'set cmax -0.1'
'set ccolor 58'
*'set ccolor 1'
*'set clevs -6 -4 -2 -1'
*'set clevs -0.1 -0.2'
'set clopts -1 -1 0.15'
*'set clskip 2'
'set cstyle 2'
'set cthick 7'
'd reg2dz'
*'set cint 1'
'set cmin 0.1'
'set cstyle 1'
'set ccolor 69'
*'set ccolor 1'
'set clevs 1 2 4 6'
*'set clevs 0.2 0.4 0.6 0.8 1.0 1.2 1.4'
'd reg2dz'
*'set clab on'
*'set clevs 0'
*'set ccolor 1'
*'set cstyle 1'
*'set grads off'
*'set mpdraw off'
*'set cthick 8'
*'d reg2dz'

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
