function reg_noaahadisst

*'set xlopt color thickness size'
*'set xlopts 1 4 0.16'
*'set ylopts 1 4 0.16'
*'set ylint 10'
'reset'
*'set vpage 0.2 11 0.2 3.8'
ts=111
te=138
tt=te-ts+1

'set t 1'
'sstave=ave(sst.1,t='ts',t='te')'
'zav2d=ave(psi.2,t='ts',t='te')'
'pxav2d=ave(px.2,t='ts',t='te')'
'pyav2d=ave(py.2,t='ts',t='te')'
'pzav2d=ave(pz.2,t='ts',t='te')'
'divav2d=ave(div.2,t='ts',t='te')'
'set t 'ts' 'te
'sstanom=sst.1-sstave'
'zanom2d=psi.2-zav2d'
'pxanom2d=px.2-pxav2d'
'pyanom2d=py.2-pyav2d'
'pzanom2d=pz.2-pzav2d'
'divanom2d=div.2-divav2d'
'regiona=aave(sstanom,lon=165,lon=220,lat=-10,lat=10)'
'regionb=aave(sstanom,lon=250,lon=280,lat=-15,lat=5)'
'regionc=aave(sstanom,lon=125,lon=145,lat=-10,lat=20)'
'nino4ori=regiona-(0.5*regionb)-(0.5*regionc)'
*nino3.4 'nino4ori=aave(sstanom,lon=190,lon=240,lat=-5,lat=5)'
*nino 4 'nino4ori=aave(sstanom,lon=160,lon=210,lat=-5,lat=5)'
*nino 3 'nino4ori=aave(sstanom,lon=215,lon=265,lat=-5,lat=5)'

*'../from_martin_king_scratch/scripts/polst 0 n'

'set t 'ts' 'te
*'cova2dx=-maskout(nino4ori,-nino4ori)*px.2'
*'cova2dy=-maskout(nino4ori,-nino4ori)*py.2'
*'cova2d=-maskout(nino4ori,-nino4ori)*z.2'
'cova2dx=(nino4ori)*pxanom2d'
'cova2dy=(nino4ori)*pyanom2d'
'cova2dz=(nino4ori)*pzanom2d'
'cova2dp=(nino4ori)*pzanom2d'
'cova2dd=(nino4ori)*divanom2d'
'cova2dsst=nino4ori*sstanom'

'set t 1'
'nino4var=ave(pow(nino4ori,2),t='ts',t='te')'

'reg2dx=ave(cova2dx,t='ts',t='te')/sqrt(nino4var)'
'reg2dy=ave(cova2dy,t='ts',t='te')/sqrt(nino4var)'
'reg2dz=ave(cova2dz,t='ts',t='te')/sqrt(nino4var)'
'reg2dd=ave(cova2dd,t='ts',t='te')/sqrt(nino4var)'
'reg2dp=ave(cova2dp,t='ts',t='te')/sqrt(nino4var)'
'reg2dsst=ave(cova2dsst,t='ts',t='te')/sqrt(nino4var)'

'covvar2d=ave(pow(cova2dd/sqrt(nino4var)-reg2dd,2),t='ts',t='te')'
'tstat2d=abs(ave(cova2dd/sqrt(nino4var),t='ts',t='te'))/sqrt(covvar2d)*sqrt('tt')'
'set grads off'

'run /Users/martinpeterking/work_2016dec.dir/martinking_temporary.dir/Desktop/work_sep2016.dir/some_grads_scripts.dir/scripts/rgbset.gs'

'set mpdraw on'
'set rgb 17 90 90 90'
'set map 17 1 6'
'set display color white'
'set xlopts 1 4 0.18'
'set ylopts 1 4 0.18'
'set gxout shaded'
'set rgb 16 200 200 200'
'set rbcols 16'
'set cmin 0'
'set lat 20 70'
'set lon 0 360'
'set ylint 20'
'set xlint 60'
'd tstat2d-1.5'
*'set cmax -0.2'
*'d reg2d'


return
