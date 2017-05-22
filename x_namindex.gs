function x

'reset'
tmax=1685
t1=15
t=0+t1
zmax=24

'set fwrite -le -st noaa_namindex_'t1'_autumn1871_spring2011.dat'
'set gxout fwrite'

while (t<=tmax)
  'set t 't
  say t
  z=1
  while (z<=zmax)
   'set z 'z
   'annmod=aave(hgt,lon=0,lon=360,lat=40,lat=60)-aave(hgt,lon=0,lon=360,lat=70,lat=90)'
   'd annmod'
   z=z+1
  endwhile
  t=t+12
endwhile
'disable fwrite'

return
