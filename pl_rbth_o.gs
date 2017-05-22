function plrb(args)

*  	pl_rbth : script to make contineous (+), thick black(0) and dashed (-) contours
*		with specified contour interval
*		usage: 	run pl_rb <var> <cin>
*		where: 	<var> = variable to be plotted
*			<cin> = contour interval

var=subwrd(args,1)
cin=subwrd(args,2)
*var2=subwrd(args,3)

*'set vpage 0.2 8.3 0.2 5.5'
*'set vpage 0.2 8.3 0.2 3.7'
*'/Users/martinpking/work_8jul2011.dir/from_martin_king_scratch/scripts/polst 0 n'
*'set mpvals 90 270 30 90'
*'set lon 90 270'
*'set lat 30 90'
*'set mproj nps'
*'set ylint 20'
*'set xlint 30'

*'set xlopts 1 4 0.15'
*'set ylopts 1 4 0.15'

'set display color white'

'set grads off'
'set mpdraw on'
'set rgb 17 90 90 90'
'set map 17 1 5'
'set grid on 5 1'

*'set gxout shaded'
*'set rgb 16 210 210 210'
*'set rbcols 16'
*'set cmin 0'
*'d 'var2

'run /Users/martinpeterking/work_2016dec.dir/martinking_temporary.dir/Desktop/work_sep2016.dir/some_grads_scripts.dir/scripts/rgbset.gs'


'set gxout contour'
'set clab on'
'set cint 'cin
*red 
'set ccolor 69'
*'set ccolor 1'
'set cstyle 1'
'set cmin 'cin
'set clopts -1 -1 0.17'
*'set clskip 2'
'set mpdraw on'
'set cthick 8'
'd 'var

'set cint 'cin
*blue 
'set ccolor 58'
*'set ccolor 1'
'set cstyle 2'
'set cmax -'cin
*'set grads off'
*'set mpdraw off'
'set cthick 8'
'd 'var

'set clab on'
'set clevs 0'
'set ccolor 1'
'set cstyle 1'
*'set grads off'
*'set mpdraw off'
'set cthick 12'
'd 'var

*'set mpdraw on'

return
