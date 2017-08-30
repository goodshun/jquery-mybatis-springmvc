<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/public/Common.js"></script>
	
	<style type="text/css">
	.my_btn {
	min-width: 67px;
	border-radius:3px;
		}
		.ui-nav-btn-group > .ui-nav-button {
  	 	 margin-left: -1px;
    	padding: 0 15px;
    	border-left: 1px solid #e3e3e3;
    	color: #16a8cc;
}
	</style>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/memberMgr/js/memberMgr.js"></script>
</head>
<body>
<div class="main">
	<div class="panel panel-default">
		<div class="panel-body">
			<form class="form-horizontal js-user-query" id = "searchForm">
				<div class="col-md-4 col-sm-6">
					<div class="form-group">
						<label class="col-md-4 col-sm-4 control-label">用户账号</label>
						<div class="col-md-8 col-sm-8">
							<input type="text" name="job_type" id="job_type"
								class="form-control">
						</div>
					</div>
				</div>
				<!-- col-md-4 end -->
				<div class="col-md-4 col-sm-6">
					<div class="form-group">
						<label class="col-md-4 col-sm-4 control-label">用户姓名</label>
						<div class="col-md-8 col-sm-8">
							<input name="job_name" class="form-control">
						</div>
					</div>
				</div>
			
				<!-- col-md-4 end -->
				<div class="col-md-4 col-sm-6">
					<div class="form-group">
						<div class="col-md-8 col-md-offset-2" >
						    <td class="title">
	                     	<button type="button" id='' onclick='searchJob();' class="btn btn-primary my_btn" style="margin-left: 15px;">查询</button>
	                     	<button type="button" id='' onclick='clearSerch();' class="btn btn-default my_btn" >重置</button>
	                     </td>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="grid js-job-grid grid-height-sm">
	
	</div>
</div>
</body>
</html>