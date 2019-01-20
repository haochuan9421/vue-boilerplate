<script>
import logo from '../assets/logo.png';
export default {
  render() {
    return(
      <div class="about">
        <img src={logo} alt="logo"/>
        <p>关于页</p>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  color: red;
}
</style>



