function xxx(args)

var=subwrd(args,1)

'reset'
'set lon 0 360'
'set lat -90 90'
*'set vpage 0. 11 0. 6.'
*'set vpage 0. 9.5 0. 4.9'
*'set mpdset mres'
'set mpdraw on'
'set rgb 17 90 90 90'
'set map 17 1 6'
*'set grads off'
'set display color white'
'run /Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/some_grads_scripts.dir/scripts/rgbset.gs'

'set grads off'
'set gxout shaded'
'set ccols  49 48 47 46 44 43 0 23 24 25 66 67 68'
'set clevs  -1.4 -1.2 -0.8 -0.6 -0.4 -0.1  0.1 0.4 0.6 0.8 1.2 1.4'
*'set clevs -15  -10  -8. -5 -2  2  4  6. 8. 10.'
*'set clevs -1.5 -1. -0.5 -0.1  0.1 0.5 1. 1.5'
*'set ccols  48 46  44  42  0  22 24 25 26 27'
* CAPE 'set clevs 500 750  1000  1500 2000 3000'
* Eqv Pot Temp 'set clevs 315 320 325 330 335 340 345 350'
* Eqv Pot Temp 'set ccols 0   21 22  23  24  25  26  27 28 69'
* mass weighted ave. temp. 'set clevs   -31  -30  -29 -28 -27'
* mass weighted ave. temp. 'set ccols 0   23 25   27  28 29'
* pressure 'set clevs 200 210 220'
*'set ccols 0 62 64 66 68'

'set xlopts 1 5 0.23'
'set ylopts 1 5 0.23'
'set ylint 30'
'set xlint 60'
'set grid on 5 1'
*'set lat -90 90'
*'set lon 0 360'

*'d 'var
'd maskout('var',tstat2ds-2)'
'run /Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/scripts/pl_rbth_o.gs 'var' 0.3'

*'draw title '
*'set strsiz .3'
*'set string 1 l 7'
*for tropical channel 'draw string 0.9 3.8 GPCP DJF 1999-2004 Precip (mm/day)'
*'draw title 1948/78 to 1979/10 Change: DJFM SST & 850mb Wind'
*'draw title JAN: REG[SST,NINO34]'
*'draw string 0.5 6.9 Jun Precip Reg. on May Jet Speed (mm/day)'
*'run /Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/some_grads_scripts.dir/scripts/cbar.gs 1.4 0 4.2 1.1'
* cbar.gs sf vert xmid ymid

*'set gxout contour'
*'set grads off'


* blue 'set ccolor 47'
*'set ccolor 1'
*'set clevs -0.1 -0.2 -0.4 -0.6'
*'set clevs 315 320 325 330 335 340 345 350'
*'set ccolor 1'
*'set clskip 2'
*'set cstyle 2'
*'set clab off'
*'set cint 0.25'
*'set cmax 0'
*'set cthick 5'
*'set cstyle 2'
*'set ccolor 1'
*'set clopts -1 -1 0.17'
*'d 'var
*'set clevs 0.1 0.2 0.4 0.6'
**'set clevs 0.2 0.4 0.6 0.8 1.0 1.2 1.4'
*'set clab off'
*'set cint 0.25'
*'set cmin 0'
*'set cthick 5'
*'set cstyle 1'
*'set ccolor 1'
*'set clopts -1 -1 0.17'
*'d 'var
*'set clab on'
*'set clevs 0'
*'set ccolor 1'
*'set cstyle 1'
*'set grads off'
**'set mpdraw off'
*'set cthick 6'

*'d 'var

return
