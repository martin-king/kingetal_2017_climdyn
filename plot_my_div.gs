function xxx(args)

var=subwrd(args,1)

'set vpage 0. 11 0. 3.'
*'set mpdset mres'
'set mpdraw on'
'set rgb 17 80 80 80'
'set map 17 1 12'
'set ylint 20'
'set xlint 60'
'set grads off'
'set grid on 5 1'
*'set frame circle'
'set frame on'
'set display color white'
'run /Users/martinpeterking/work_2016dec.dir/martinking_temporary.dir/Desktop/work_sep2016.dir/some_grads_scripts.dir/scripts/rgbset.gs'

'set grads off'
*'set vpage 0.2 8.5 0.2 5.8'
'set gxout shaded'
'set clevs  -2. -1.5 -1. -0.5 0.5 1. 1.5 2.' 
'set ccols  48 46 44 42 0 62 64 66 67'
*'set clevs 5 10 15 20 25'
*'set ccols  0 43 45  47 49 57'

'set xlopts 1 5 0.23'
'set ylopts 1 5 0.23'
*'set ylint 10'
*'set lat -30 60'
*'set lon 0 200'
*'set lat -30 60'
*'set lon 0 360'

'd 'var 

**'draw title '
*'set strsiz .3'
*'set string 1 l 7'
*for tropical channel 'draw string 0.9 3.8 GPCP DJF 1999-2004 Precip (mm/day)'
**'draw string 0.9 4.5 GPCP: Dec 1979-2010 Precip (mm/day)'
*'draw title FEB: R[SIC,tSIC]; R[SST,tSIC,CI=0.1K]'
*'run /Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/some_grads_scripts.dir/scripts/cbar.gs 1.4 0 4.2 1.1'
'run /Users/martinpeterking/work_2016dec.dir/martinking_temporary.dir/Desktop/work_sep2016.dir/some_grads_scripts.dir/scripts/cbar.gs 0.8 1 10.2 1.5'
* cbar.gs sf vert xmid ymid

return
